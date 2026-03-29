"use client";

import { motion } from "framer-motion";

interface ToneSelectorProps {
  selected: string | null;
  onSelect: (tone: string) => void;
  disabled?: boolean;
}

const tones = [
  { id: "chamuyero_suave", label: "Suave" },
  { id: "chamuyero_atrevido", label: "Atrevido" },
  { id: "chamuyero_picante", label: "Picante" },
  { id: "chamuyero_romantico", label: "Romántico" },
  { id: "chamuyero_divertido", label: "Divertido" },
];

export default function ToneSelector({
  selected,
  onSelect,
  disabled,
}: ToneSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="flex flex-wrap gap-2"
    >
      {tones.map((tone) => (
        <motion.button
          key={tone.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(tone.id)}
          disabled={disabled}
          className={`rounded-full px-4 py-2 text-xs font-medium transition-all ${
            selected === tone.id
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
        >
          {tone.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
