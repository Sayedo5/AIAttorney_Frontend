import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { useState } from 'react';

export interface CameraOptions {
  quality?: number;
  allowEditing?: boolean;
  source?: 'camera' | 'photos' | 'prompt';
}

export const useCamera = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const takePhoto = async (options: CameraOptions = {}): Promise<string | null> => {
    setLoading(true);
    setError(null);

    try {
      const sourceMap = {
        camera: CameraSource.Camera,
        photos: CameraSource.Photos,
        prompt: CameraSource.Prompt,
      };

      const image: Photo = await Camera.getPhoto({
        quality: options.quality || 90,
        allowEditing: options.allowEditing ?? true,
        resultType: CameraResultType.DataUrl,
        source: sourceMap[options.source || 'prompt'],
      });

      const imageUrl = image.dataUrl || null;
      setPhoto(imageUrl);
      setLoading(false);
      return imageUrl;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to take photo';
      setError(errorMessage);
      setLoading(false);
      
      // Check if user cancelled
      if (errorMessage.includes('cancelled') || errorMessage.includes('canceled')) {
        return null;
      }
      
      console.error('Camera error:', err);
      return null;
    }
  };

  const checkPermissions = async () => {
    try {
      const status = await Camera.checkPermissions();
      return status;
    } catch (error) {
      console.log('Camera permissions check failed:', error);
      return null;
    }
  };

  const requestPermissions = async () => {
    try {
      const status = await Camera.requestPermissions();
      return status;
    } catch (error) {
      console.log('Camera permissions request failed:', error);
      return null;
    }
  };

  const clearPhoto = () => {
    setPhoto(null);
    setError(null);
  };

  return {
    photo,
    loading,
    error,
    takePhoto,
    checkPermissions,
    requestPermissions,
    clearPhoto,
  };
};
