import { useEffect } from "react";

interface DeepLinkConfig {
  scheme: string;
  host: string;
}

interface DeepLinkRoute {
  path: string;
  screen: string;
  params?: string[];
}

const routes: DeepLinkRoute[] = [
  { path: "/chat", screen: "chat" },
  { path: "/chat/:sessionId", screen: "chat", params: ["sessionId"] },
  { path: "/library", screen: "library" },
  { path: "/case/:caseId", screen: "case-detail", params: ["caseId"] },
  { path: "/documents", screen: "documents" },
  { path: "/diary", screen: "diary" },
  { path: "/cause-list", screen: "cause-list" },
  { path: "/settings", screen: "settings" },
  { path: "/upgrade", screen: "upgrade-plan" },
];

interface DeepLinkHandlerProps {
  config: DeepLinkConfig;
  onNavigate: (screen: string, params?: Record<string, string>) => void;
  children: React.ReactNode;
}

export function DeepLinkHandler({
  config,
  onNavigate,
  children,
}: DeepLinkHandlerProps) {
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      try {
        const urlObj = new URL(url);
        const path = urlObj.pathname;

        for (const route of routes) {
          const match = matchRoute(route.path, path);
          if (match) {
            onNavigate(route.screen, match.params);
            return;
          }
        }
      } catch (error) {
        console.error("Failed to parse deep link:", error);
      }
    };

    // Handle initial URL (if app was opened via deep link)
    const initialUrl = window.location.href;
    if (initialUrl.includes(config.scheme) || initialUrl.includes(config.host)) {
      handleDeepLink(initialUrl);
    }

    // Listen for popstate events (browser back/forward)
    const handlePopState = () => {
      handleDeepLink(window.location.href);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [config, onNavigate]);

  return <>{children}</>;
}

function matchRoute(
  pattern: string,
  path: string
): { params: Record<string, string> } | null {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart.startsWith(":")) {
      // This is a parameter
      const paramName = patternPart.slice(1);
      params[paramName] = pathPart;
    } else if (patternPart !== pathPart) {
      // Static parts don't match
      return null;
    }
  }

  return { params };
}

// Utility function to create deep links
export function createDeepLink(
  config: DeepLinkConfig,
  screen: string,
  params?: Record<string, string>
): string {
  const route = routes.find((r) => r.screen === screen);
  if (!route) return `${config.scheme}://${config.host}/`;

  let path = route.path;
  if (params && route.params) {
    for (const param of route.params) {
      if (params[param]) {
        path = path.replace(`:${param}`, params[param]);
      }
    }
  }

  return `${config.scheme}://${config.host}${path}`;
}
