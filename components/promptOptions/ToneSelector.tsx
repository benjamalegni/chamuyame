"use client";

import { motion } from "framer-motion";
import { CircleHelp } from "lucide-react";
import { toneOptions, type ToneId } from "@/lib/tone-options";

interface ToneSelectorProps {
  selected: ToneId | null;
  onSelect: (tone: ToneId) => void;
  onOpenDetails: () => void;
  disabled?: boolean;
}

export default function ToneSelector({
  selected,
  onSelect,
  onOpenDetails,
  disabled,
}: ToneSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">
          Elegi el tono o abri la guia para entender y editar cada estilo.
        </p>
        <button
          type="button"
          onClick={onOpenDetails}
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CircleHelp className="h-4 w-4" />
          Ver estilos
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex flex-wrap gap-2"
      >
        {toneOptions.map((tone) => (
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
    </div>
  );
}
