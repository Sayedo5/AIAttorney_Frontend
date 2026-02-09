// Theme utilities

export type ThemeMode = "light" | "dark" | "system";

export const getSystemTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export const applyTheme = (theme: ThemeMode): void => {
  const root = document.documentElement;
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
  
  root.classList.remove("light", "dark");
  root.classList.add(resolvedTheme);
  
  // Update meta theme-color for mobile browsers
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute(
      "content",
      resolvedTheme === "dark" ? "#0f0f0f" : "#ffffff"
    );
  }
};

export const getStoredTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "system";
  return (localStorage.getItem("theme") as ThemeMode) || "system";
};

export const storeTheme = (theme: ThemeMode): void => {
  localStorage.setItem("theme", theme);
};

export const watchSystemTheme = (callback: (theme: "light" | "dark") => void): () => void => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  
  const handler = (e: MediaQueryListEvent) => {
    callback(e.matches ? "dark" : "light");
  };
  
  mediaQuery.addEventListener("change", handler);
  return () => mediaQuery.removeEventListener("change", handler);
};
