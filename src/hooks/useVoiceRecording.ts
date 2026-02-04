import { useState, useCallback, useRef, useEffect } from 'react';

interface UseVoiceRecordingOptions {
  onTranscript?: (text: string) => void;
  onError?: (error: string) => void;
  language?: string;
}

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  error: string;
  message?: string;
}

// Extend Window interface for SpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  onstart: () => void;
}

export function useVoiceRecording({
  onTranscript,
  onError,
  language = 'en-US'
}: UseVoiceRecordingOptions = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setIsSupported(!!SpeechRecognition);

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimText = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          } else {
            interimText += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(prev => {
            const newTranscript = prev + finalTranscript;
            onTranscript?.(newTranscript);
            return newTranscript;
          });
        }
        setInterimTranscript(interimText);
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        onError?.(event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [language, onTranscript, onError]);

  const startRecording = useCallback(() => {
    if (!recognitionRef.current) {
      onError?.('Speech recognition not supported');
      return;
    }

    setTranscript('');
    setInterimTranscript('');
    
    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording:', error);
      onError?.('Failed to start recording');
    }
  }, [onError]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      
      // Return the final transcript
      const finalText = transcript + interimTranscript;
      setInterimTranscript('');
      return finalText;
    }
    return transcript;
  }, [isRecording, transcript, interimTranscript]);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      return stopRecording();
    } else {
      startRecording();
      return '';
    }
  }, [isRecording, startRecording, stopRecording]);

  const setLanguage = useCallback((lang: string) => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = lang;
    }
  }, []);

  return {
    isRecording,
    isSupported,
    transcript,
    interimTranscript,
    fullTranscript: transcript + interimTranscript,
    startRecording,
    stopRecording,
    toggleRecording,
    setLanguage,
    clearTranscript: () => {
      setTranscript('');
      setInterimTranscript('');
    }
  };
}
