"use client";

import { useState, useCallback } from "react";
import Tesseract from "tesseract.js";

interface UseOCRReturn {
  extractText: (imageDataUrl: string) => Promise<string>;
  isProcessing: boolean;
  error: string | null;
}

export function useOCR(): UseOCRReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const extractText = useCallback(
    async (imageDataUrl: string): Promise<string> => {
      setIsProcessing(true);
      setError(null);

      try {
        const result = await Tesseract.recognize(imageDataUrl, "spa+eng", {
          logger: () => {},
        });

        const text = result.data.text.trim();
        setIsProcessing(false);

        if (!text) {
          setError("No se detectó texto en la imagen");
          return "";
        }

        return text;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al procesar la imagen";
        setError(errorMessage);
        setIsProcessing(false);
        return "";
      }
    },
    []
  );

  return { extractText, isProcessing, error };
}
