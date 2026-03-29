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
        className="h-20 w-full resize-none rounded-lg border border-border bg-input p-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-border focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
      />
    </motion.div>
  );
}
