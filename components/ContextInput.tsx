"use client";

import { motion } from "framer-motion";

interface ContextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function ContextInput({
  value,
  onChange,
  disabled,
}: ContextInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full"
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="Agrega contexto (opcional). Ej: es mi flaca, es el jefe..."
        className="w-full bg-white rounded-lg p-4 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 resize-none h-20 focus:outline-none focus:border-black focus:ring-0 transition-colors disabled:opacity-50 disabled:bg-gray-50"
      />
    </motion.div>
  );
}
