import { SplashScreen } from '@capacitor/splash-screen';

export const useSplashScreen = () => {
  const show = async (options?: {
    autoHide?: boolean;
    fadeInDuration?: number;
    fadeOutDuration?: number;
    showDuration?: number;
  }) => {
    try {
      await SplashScreen.show({
        autoHide: options?.autoHide ?? true,
        fadeInDuration: options?.fadeInDuration ?? 200,
        fadeOutDuration: options?.fadeOutDuration ?? 200,
        showDuration: options?.showDuration ?? 2000,
      });
    } catch (error) {
      console.log('SplashScreen not available:', error);
    }
  };

  const hide = async (fadeOutDuration?: number) => {
    try {
      await SplashScreen.hide({
        fadeOutDuration: fadeOutDuration ?? 200,
      });
    } catch (error) {
      console.log('SplashScreen not available:', error);
    }
  };

  return { show, hide };
};
