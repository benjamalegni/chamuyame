"use client";

import { motion } from "framer-motion";
import { Sparkles, Copy, RefreshCw } from "lucide-react";

interface ResponseCardProps {
  response: string;
  isLoading?: boolean;
  onRegenerate: () => void;
  onCopy: () => void;
}

export default function ResponseCard({
  response,
  isLoading,
  onRegenerate,
  onCopy,
}: ResponseCardProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full rounded-lg bg-card p-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-muted-foreground" />
          </motion.div>
          <p className="text-sm text-muted-foreground">Pensando...</p>
        </div>
      </motion.div>
    );
  }

  if (!response) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="w-full rounded-lg bg-card p-6"
    >
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          Respuesta sugerida
        </span>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-base leading-relaxed text-foreground"
      >
        {response}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2"
      >
        <button
          onClick={onRegenerate}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <RefreshCw className="h-4 w-4" />
          Otra
        </button>
        <button
          onClick={onCopy}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
        >
          <Copy className="h-4 w-4" />
          Copiar
        </button>
      </motion.div>
    </motion.div>
  );
}
