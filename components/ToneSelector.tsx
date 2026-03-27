"use client";

import { motion } from "framer-motion";

interface ToneSelectorProps {
  selected: string | null;
  onSelect: (tone: string) => void;
  disabled?: boolean;
}

const tones = [
  { id: "casual", label: "Casual" },
  { id: "formal", label: "Formal" },
  { id: "divertido", label: "Divertido" },
  { id: "serio", label: "Serio" },
  { id: "atrevido", label: "Atrevido" },
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
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
            selected === tone.id
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          {tone.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
