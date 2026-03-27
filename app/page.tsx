"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import TextPreview from "@/components/TextPreview";
import ContextInput from "@/components/ContextInput";
import ToneSelector from "@/components/ToneSelector";
import ResponseCard from "@/components/ResponseCard";
import { useOCR } from "@/hooks/useOCR";

type AppState = "idle" | "image-selected" | "processing" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const { extractText, isProcessing: isOCRProcessing } = useOCR();

  const handleImageSelected = useCallback(
    async (file: File | null) => {
      if (!file) {
        setSelectedImage(null);
        setExtractedText("");
        setState("idle");
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);
        setState("image-selected");

        const text = await extractText(dataUrl);
        setExtractedText(text);
      };
      reader.readAsDataURL(file);
    },
    [extractText]
  );

  const handleChamuyar = useCallback(async () => {
    if (!extractedText) return;

    setState("processing");
    setResponse("");
    setError(null);

    try {
      const res = await fetch("/api/chamuyar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textoConversacion: extractedText,
          contexto: context,
          tono: selectedTone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al generar respuesta");
      }

      setResponse(data.respuesta);
      setState("result");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setState("result");
    }
  }, [extractedText, context, selectedTone]);

  const handleRegenerate = useCallback(() => {
    handleChamuyar();
  }, [handleChamuyar]);

  const handleReset = useCallback(() => {
    setSelectedImage(null);
    setExtractedText("");
    setContext("");
    setSelectedTone(null);
    setResponse("");
    setError(null);
    setState("idle");
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(response);
  }, [response]);

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-md mx-auto px-5 py-12 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-sem tracking-tight text-gray-900">
              Chamuyame
            </h1>
          </div>
          <p className="text-sm text-gray-500">
            Subi el screenshot del chat y te chamos que responder
          </p>
        </motion.header>

        <div className="flex flex-col gap-5">
          <ImageUploader
            selectedImage={selectedImage}
            onImageSelected={handleImageSelected}
          />

          <AnimatePresence mode="wait">
            {(state === "image-selected" || state === "processing" || state === "result") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4"
              >
                <TextPreview
                  text={extractedText}
                  isLoading={isOCRProcessing}
                />

                {!isOCRProcessing && extractedText && (
                  <>
                    <ContextInput
                      value={context}
                      onChange={setContext}
                      disabled={state === "processing" || state === "result"}
                    />

                    <ToneSelector
                      selected={selectedTone}
                      onSelect={setSelectedTone}
                      disabled={state === "processing" || state === "result"}
                    />

                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                      >
                        {error}
                      </motion.div>
                    )}

                    {state !== "result" && (
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={handleChamuyar}
                        className="w-full py-3.5 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        Generar respuesta
                      </motion.button>
                    )}

                    <ResponseCard
                      response={response}
                      isLoading={state === "processing"}
                      onRegenerate={handleRegenerate}
                      onCopy={handleCopy}
                    />

                    {state === "result" && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={handleReset}
                        className="text-gray-400 hover:text-gray-600 transition-colors text-sm py-2 w-full text-center"
                      >
                        Arrancar de nuevo
                      </motion.button>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 pt-8 border-t border-gray-100 text-center"
        >
          <p className="text-xs text-gray-400">
            Las imagenes nunca salen de tu navegador
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
