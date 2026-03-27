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
        className="w-full bg-black rounded-lg p-6"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-5 h-5 text-white/70" />
          </motion.div>
          <p className="text-sm text-white/80">Pensando...</p>
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
      className="w-full bg-black rounded-lg p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-white/60" />
        <span className="text-xs text-white/60 uppercase tracking-wide">Respuesta sugerida</span>
      </div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-white text-base leading-relaxed mb-6"
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
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Otra
        </button>
        <button
          onClick={onCopy}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-100 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copiar
        </button>
      </motion.div>
    </motion.div>
  );
}
