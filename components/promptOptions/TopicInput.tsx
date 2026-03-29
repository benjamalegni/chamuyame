"use client";

import { motion } from "framer-motion";

interface TopicInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export default function TopicInput({
  value,
  onChange,
  disabled,
}: TopicInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.35 }}
      className="space-y-2"
    >
      <label className="text-sm font-medium text-foreground">
        Tema (opcional)
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder="fútbol, cine, viajes, música..."
        className="w-full rounded-lg border border-border bg-input px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
      />
    </motion.div>
  );
}
