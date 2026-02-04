/**
 * Fuzzy search utilities for matching text with typos and partial matches
 */

// Calculate Levenshtein distance between two strings
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Calculate similarity score (0-1) based on Levenshtein distance
function calculateSimilarity(query: string, text: string): number {
  const distance = levenshteinDistance(query.toLowerCase(), text.toLowerCase());
  const maxLength = Math.max(query.length, text.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

// Check if query matches any word in text with fuzzy tolerance
function fuzzyWordMatch(query: string, text: string, threshold: number = 0.6): boolean {
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  
  // Exact substring match (highest priority)
  if (textLower.includes(queryLower)) {
    return true;
  }

  // Word-by-word fuzzy matching
  const textWords = textLower.split(/\s+/);
  const queryWords = queryLower.split(/\s+/);

  for (const queryWord of queryWords) {
    if (queryWord.length < 2) continue;
    
    for (const textWord of textWords) {
      // Partial match at start of word
      if (textWord.startsWith(queryWord.slice(0, Math.max(2, queryWord.length - 1)))) {
        return true;
      }
      
      // Fuzzy similarity match
      const similarity = calculateSimilarity(queryWord, textWord);
      if (similarity >= threshold) {
        return true;
      }
    }
  }

  return false;
}

export interface FuzzySearchResult<T> {
  item: T;
  score: number;
  matches: string[];
}

export interface FuzzySearchOptions {
  threshold?: number;  // Minimum similarity (0-1), default 0.5
  keys: string[];      // Keys to search in objects
}

// Main fuzzy search function
export function fuzzySearch<T extends Record<string, any>>(
  items: T[],
  query: string,
  options: FuzzySearchOptions
): FuzzySearchResult<T>[] {
  const { threshold = 0.5, keys } = options;
  
  if (!query.trim()) return [];
  
  const queryLower = query.toLowerCase().trim();
  const results: FuzzySearchResult<T>[] = [];

  for (const item of items) {
    let bestScore = 0;
    const matches: string[] = [];

    for (const key of keys) {
      const value = item[key];
      if (typeof value !== 'string') continue;
      
      const valueLower = value.toLowerCase();
      
      // Calculate match score
      let score = 0;
      
      // Exact match (highest score)
      if (valueLower === queryLower) {
        score = 1;
      }
      // Starts with query
      else if (valueLower.startsWith(queryLower)) {
        score = 0.95;
      }
      // Contains exact query
      else if (valueLower.includes(queryLower)) {
        score = 0.85;
      }
      // Word starts with query
      else if (valueLower.split(/\s+/).some(word => word.startsWith(queryLower))) {
        score = 0.8;
      }
      // Fuzzy word match
      else if (fuzzyWordMatch(queryLower, valueLower, threshold)) {
        score = calculateSimilarity(queryLower, valueLower) * 0.75;
      }
      // Initials match (e.g., "pc" matches "Property Case")
      else {
        const initials = valueLower
          .split(/\s+/)
          .map(word => word[0])
          .join('');
        if (initials.includes(queryLower) || queryLower.includes(initials)) {
          score = 0.6;
        }
      }

      if (score > 0) {
        matches.push(key);
        bestScore = Math.max(bestScore, score);
      }
    }

    if (bestScore >= threshold) {
      results.push({ item, score: bestScore, matches });
    }
  }

  // Sort by score (highest first)
  return results.sort((a, b) => b.score - a.score);
}

// Simple highlight function for fuzzy matches
export function highlightFuzzyMatch(text: string, query: string): { text: string; isMatch: boolean }[] {
  if (!query.trim()) return [{ text, isMatch: false }];
  
  const queryLower = query.toLowerCase();
  const textLower = text.toLowerCase();
  const parts: { text: string; isMatch: boolean }[] = [];
  
  let lastIndex = 0;
  let index = textLower.indexOf(queryLower);
  
  // If exact match found, highlight it
  while (index !== -1) {
    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), isMatch: false });
    }
    parts.push({ text: text.slice(index, index + query.length), isMatch: true });
    lastIndex = index + query.length;
    index = textLower.indexOf(queryLower, lastIndex);
  }
  
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isMatch: false });
  }
  
  // If no exact match, try to highlight partial matches
  if (parts.length === 0 || (parts.length === 1 && !parts[0].isMatch)) {
    const queryWords = queryLower.split(/\s+/).filter(w => w.length >= 2);
    let result = text;
    const highlights: { start: number; end: number }[] = [];
    
    for (const queryWord of queryWords) {
      const wordIndex = textLower.indexOf(queryWord);
      if (wordIndex !== -1) {
        highlights.push({ start: wordIndex, end: wordIndex + queryWord.length });
      }
    }
    
    if (highlights.length === 0) {
      return [{ text, isMatch: false }];
    }
    
    // Merge overlapping highlights
    highlights.sort((a, b) => a.start - b.start);
    const merged: { start: number; end: number }[] = [];
    for (const h of highlights) {
      if (merged.length === 0 || h.start > merged[merged.length - 1].end) {
        merged.push(h);
      } else {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, h.end);
      }
    }
    
    // Build parts from merged highlights
    const newParts: { text: string; isMatch: boolean }[] = [];
    let pos = 0;
    for (const h of merged) {
      if (h.start > pos) {
        newParts.push({ text: text.slice(pos, h.start), isMatch: false });
      }
      newParts.push({ text: text.slice(h.start, h.end), isMatch: true });
      pos = h.end;
    }
    if (pos < text.length) {
      newParts.push({ text: text.slice(pos), isMatch: false });
    }
    
    return newParts;
  }
  
  return parts;
}
