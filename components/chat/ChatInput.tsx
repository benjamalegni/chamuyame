"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, MessageSquare } from "lucide-react";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  /** Mientras se extrae texto desde una imagen (OCR) */
  loadingConversation?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  disabled,
  loadingConversation = false,
}: ChatInputProps) {
  const [focused, setFocused] = useState(false);
  const showInlinePlaceholder =
    !loadingConversation && !value.trim() && !focused;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex h-full min-h-0 flex-col"
    >
      <label htmlFor="chat-input" className="sr-only">
        Conversación
      </label>
      <div
        className={`relative min-h-[280px] flex-1 rounded-lg border border-border ${
          disabled || loadingConversation ? "bg-muted" : "bg-card"
        }`}
        aria-busy={loadingConversation}
      >
        <textarea
          id="chat-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={12}
          className="absolute inset-0 z-[1] min-h-[280px] w-full resize-none rounded-lg bg-transparent px-4 py-4 text-sm text-foreground placeholder-transparent focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed"
        />
        {loadingConversation && (
          <div
            className="pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center gap-3 rounded-lg bg-card/85 px-6 text-center backdrop-blur-[2px]"
            role="status"
            aria-live="polite"
          >
            <Loader2
              className="h-8 w-8 shrink-0 animate-spin text-primary"
              aria-hidden
            />
            <p className="text-sm font-medium text-foreground">
              Leyendo la conversación…
            </p>
            <p className="max-w-[16rem] text-xs text-muted-foreground">
              Extrayendo texto de la imagen. Puede tardar unos segundos.
            </p>
          </div>
        )}
        {showInlinePlaceholder && (
          <div
            className="pointer-events-none absolute inset-0 z-0 flex flex-col gap-1 p-4 pr-6"
            aria-hidden
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare size={16} className="shrink-0" />
              <span className="text-sm font-medium text-muted-foreground">
                Conversación
              </span>
            </div>
            <p className="pl-[1.5rem] text-xs leading-relaxed text-muted-foreground">
              Pegá la conversación de tu chat...
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
