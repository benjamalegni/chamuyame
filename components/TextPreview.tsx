"use client";

import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

interface TextPreviewProps {
  text: string;
  isLoading?: boolean;
}

export default function TextPreview({ text, isLoading }: TextPreviewProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full bg-white rounded-lg p-4 border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500">Leyendo el chat...</p>
        </div>
      </motion.div>
    );
  }

  if (!text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full bg-white rounded-lg p-4 border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-3.5 h-3.5 text-gray-400" />
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Chat detectado
        </p>
      </div>
      <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}
