import { useEffect, useState } from "react";

interface FontLoaderProps {
  children: React.ReactNode;
  onLoaded?: () => void;
}

export function FontLoader({ children, onLoaded }: FontLoaderProps) {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Check if fonts are already loaded
    if (document.fonts.ready) {
      document.fonts.ready.then(() => {
        setFontsLoaded(true);
        onLoaded?.();
      });
    } else {
      // Fallback for older browsers
      setTimeout(() => {
        setFontsLoaded(true);
        onLoaded?.();
      }, 500);
    }
  }, [onLoaded]);

  if (!fontsLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
