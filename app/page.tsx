"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { MessageCircle } from "lucide-react";
import ImageUploader from "@/components/image/ImageUploader";
import ChatInput from "@/components/chat/ChatInput";
import GenderSelector from "@/components/promptOptions/GenderSelector";
import TopicInput from "@/components/promptOptions/TopicInput";
import ContextInput from "@/components/promptOptions/ContextInput";
import ToneSelector from "@/components/promptOptions/ToneSelector";
import ResponseCard from "@/components/ResponseCard";
import GradientButton from "@/components/ui/GradientButton";
import { useOCR } from "@/hooks/useOCR";

type AppState = "idle" | "ready" | "processing" | "result";

export default function Home() {
  const [state, setState] = useState<AppState>("idle");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [chatText, setChatText] = useState<string>("");
  const [myGender, setMyGender] = useState<"mujer" | "varon" | null>(null);
  const [theirGender, setTheirGender] = useState<"mujer" | "varon" | null>(null);
  const [topic, setTopic] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<string | null>(null);
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [showImageUploader, setShowImageUploader] = useState<boolean>(true);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const { extractText, isProcessing: isOCRProcessing } = useOCR();

  const handleImageSelected = useCallback(
    async (file: File | null) => {
      if (!file) {
        setSelectedImage(null);
        setShowWarning(false);
        return;
      }

      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setSelectedImage(dataUrl);

        const text = await extractText(dataUrl);
        setChatText(text);
        if (text) {
          setState("ready");
          setShowImageUploader(false);
          setShowWarning(true);
        }
      };
      reader.readAsDataURL(file);
    },
    [extractText]
  );

  const handleChatTextChange = useCallback((text: string) => {
    setChatText(text);
    setState((prev) => {
      if (text && prev === "idle") {
        setShowImageUploader(false);
        return "ready";
      }
      if (!text && !selectedImage) {
        setShowImageUploader(true);
        setShowWarning(false);
        return "idle";
      }
      return prev;
    });
  }, [selectedImage]);

  const handleChamuyar = useCallback(async () => {
    if (!chatText || !myGender || !theirGender) return;

    setState("processing");
    setResponse("");
    setError(null);

    try {
      const res = await fetch("/api/chamuyar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          textoConversacion: chatText,
          miGenero: myGender,
          suGenero: theirGender,
          tema: topic,
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
  }, [chatText, myGender, theirGender, topic, context, selectedTone]);

  const handleRegenerate = useCallback(() => {
    handleChamuyar();
  }, [handleChamuyar]);

  const handleReset = useCallback(() => {
    setSelectedImage(null);
    setChatText("");
    setMyGender(null);
    setTheirGender(null);
    setTopic("");
    setContext("");
    setSelectedTone(null);
    setResponse("");
    setError(null);
    setState("idle");
    setShowImageUploader(true);
    setShowWarning(false);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(response);
  }, [response]);

  return (
    <main className="min-h-screen w-full bg-background">
      <div className="mx-auto w-full max-w-2xl py-12 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-3xl font-sem tracking-tight text-foreground underline decoration-primary decoration-2 underline-offset-4">
              Chamuyame
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Pegá la conversación o subi un screenshot del chat
          </p>
        </motion.header>

        <div className="space-y-6">
          <LayoutGroup>
            <div className="flex flex-row items-stretch gap-5">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.9 }}
                className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col"
              >
                <ChatInput
                  value={chatText}
                  onChange={handleChatTextChange}
                  loadingConversation={isOCRProcessing}
                  disabled={
                    isOCRProcessing || state === "processing" || state === "result"
                  }
                />
                {showWarning && (
                  <div className="text-sm text-muted-foreground m-2">
                    Puede que sea necesario corregir el contenido de la imagen analizada.
                  </div>
                )}
              </motion.div>

              {showImageUploader && (
                <>
                  <div className="shrink-0 self-center text-center text-lg text-muted-foreground">
                    o
                  </div>
                  <motion.div
                    layout
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                      mass: 0.9,
                    }}
                    className="relative z-10 flex min-h-0 min-w-0 flex-1 flex-col"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex h-full min-h-0 flex-col"
                    >
                      <ImageUploader
                        selectedImage={selectedImage}
                        onImageSelected={handleImageSelected}
                      />
                    </motion.div>
                  </motion.div>
                </>
              )}
            </div>
          </LayoutGroup>

          <AnimatePresence mode="wait">
            {(state === "ready" || state === "processing" || state === "result") && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-col gap-4"
              >
                {!isOCRProcessing && chatText && (
                  <>
                    <GenderSelector
                      myGender={myGender}
                      theirGender={theirGender}
                      onSelectMyGender={setMyGender}
                      onSelectTheirGender={setTheirGender}
                      disabled={state === "processing" || state === "result"}
                    />

                    <TopicInput
                      value={topic}
                      onChange={setTopic}
                      disabled={state === "processing" || state === "result"}
                    />

                    <ContextInput
                      value={context}
                      onChange={setContext}
                      disabled={state === "processing" || state === "result"}
                    />

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Estilo
                      </label>
                      <ToneSelector
                        selected={selectedTone}
                        onSelect={setSelectedTone}
                        disabled={state === "processing" || state === "result"}
                      />
                    </div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="rounded-lg border border-destructive-border bg-destructive-bg px-4 py-3 text-sm text-destructive"
                      >
                        {error}
                      </motion.div>
                    )}

                    {state !== "result" && (
                      <GradientButton
                        onClick={handleChamuyar}
                        disabled={!myGender || !theirGender}
                      >
                        {state === "processing" ? "Generando..." : "CHAMUYAR"}
                      </GradientButton>
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
                        className="w-full py-2 text-center text-sm text-muted-foreground transition-colors hover:text-foreground"
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
          className="mt-16 border-t border-footer-border pt-8 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Tus conversaciones no son guardadas.
          </p>
        </motion.footer>
      </div>
    </main>
  );
}
