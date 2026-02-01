import { useState, useEffect, useCallback } from "react";

export interface BookmarkedCase {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: string;
  category: "civil" | "criminal";
  summary: string;
  bookmarkedAt: string;
}

const BOOKMARKS_KEY = "ai-attorney-bookmarked-cases";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedCase[]>(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = useCallback((caseData: Omit<BookmarkedCase, "bookmarkedAt">) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === caseData.id)) {
        return prev;
      }
      return [...prev, { ...caseData, bookmarkedAt: new Date().toISOString() }];
    });
  }, []);

  const removeBookmark = useCallback((caseId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== caseId));
  }, []);

  const isBookmarked = useCallback(
    (caseId: string) => bookmarks.some((b) => b.id === caseId),
    [bookmarks]
  );

  const toggleBookmark = useCallback(
    (caseData: Omit<BookmarkedCase, "bookmarkedAt">) => {
      if (isBookmarked(caseData.id)) {
        removeBookmark(caseData.id);
        return false;
      } else {
        addBookmark(caseData);
        return true;
      }
    },
    [isBookmarked, addBookmark, removeBookmark]
  );

  return {
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
}
