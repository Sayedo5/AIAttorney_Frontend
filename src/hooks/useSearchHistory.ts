import { useState, useEffect, useCallback } from "react";

export interface SearchHistoryItem {
  id: string;
  query: string;
  type: "chat" | "document" | "case" | "library";
  timestamp: string;
  clickCount: number;
}

export interface SearchRecommendation {
  query: string;
  type: "chat" | "document" | "case" | "library";
  score: number;
  reason: "frequent" | "recent" | "trending";
}

const SEARCH_HISTORY_KEY = "ai-attorney-search-history";
const MAX_HISTORY_ITEMS = 50;

export function useSearchHistory() {
  const [history, setHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addSearch = useCallback((query: string, type: SearchHistoryItem["type"]) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      // Check if this query already exists
      const existingIndex = prev.findIndex(
        (item) => item.query.toLowerCase() === query.toLowerCase() && item.type === type
      );

      if (existingIndex >= 0) {
        // Update existing entry
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          timestamp: new Date().toISOString(),
          clickCount: updated[existingIndex].clickCount + 1,
        };
        // Move to front
        const [item] = updated.splice(existingIndex, 1);
        return [item, ...updated];
      }

      // Add new entry
      const newItem: SearchHistoryItem = {
        id: `search-${Date.now()}`,
        query: query.trim(),
        type,
        timestamp: new Date().toISOString(),
        clickCount: 1,
      };

      return [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
    });
  }, []);

  const removeSearch = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getRecentSearches = useCallback(
    (limit: number = 5): SearchHistoryItem[] => {
      return history.slice(0, limit);
    },
    [history]
  );

  const getPersonalizedRecommendations = useCallback(
    (limit: number = 5): SearchRecommendation[] => {
      if (history.length === 0) return [];

      const recommendations: SearchRecommendation[] = [];
      const now = new Date();

      // Score based on frequency and recency
      const scoredItems = history.map((item) => {
        const ageInHours = (now.getTime() - new Date(item.timestamp).getTime()) / (1000 * 60 * 60);
        const recencyScore = Math.max(0, 100 - ageInHours * 2); // Decays over ~50 hours
        const frequencyScore = Math.min(item.clickCount * 20, 100); // Cap at 100
        
        return {
          ...item,
          totalScore: recencyScore * 0.4 + frequencyScore * 0.6,
        };
      });

      // Get frequent searches (high click count)
      const frequentSearches = [...scoredItems]
        .filter((item) => item.clickCount >= 2)
        .sort((a, b) => b.clickCount - a.clickCount)
        .slice(0, 3);

      frequentSearches.forEach((item) => {
        recommendations.push({
          query: item.query,
          type: item.type,
          score: item.totalScore,
          reason: "frequent",
        });
      });

      // Get recent searches (last 24 hours)
      const recentSearches = [...scoredItems]
        .filter((item) => {
          const ageInHours = (now.getTime() - new Date(item.timestamp).getTime()) / (1000 * 60 * 60);
          return ageInHours < 24 && !frequentSearches.some((f) => f.id === item.id);
        })
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 2);

      recentSearches.forEach((item) => {
        recommendations.push({
          query: item.query,
          type: item.type,
          score: item.totalScore,
          reason: "recent",
        });
      });

      // Sort by score and limit
      return recommendations.sort((a, b) => b.score - a.score).slice(0, limit);
    },
    [history]
  );

  const getTypePreferences = useCallback((): Record<SearchHistoryItem["type"], number> => {
    const counts: Record<SearchHistoryItem["type"], number> = {
      chat: 0,
      document: 0,
      case: 0,
      library: 0,
    };

    history.forEach((item) => {
      counts[item.type] += item.clickCount;
    });

    return counts;
  }, [history]);

  return {
    history,
    addSearch,
    removeSearch,
    clearHistory,
    getRecentSearches,
    getPersonalizedRecommendations,
    getTypePreferences,
  };
}
