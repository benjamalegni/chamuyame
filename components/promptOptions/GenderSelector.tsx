"use client";

import { motion } from "framer-motion";

interface GenderSelectorProps {
  myGender: "mujer" | "hombre" | null;
  theirGender: "mujer" | "hombre" | null;
  onSelectMyGender: (gender: "mujer" | "hombre") => void;
  onSelectTheirGender: (gender: "mujer" | "hombre") => void;
  disabled?: boolean;
}

const genders = [
  {
    id: "mujer" as const,
    label: "Mujer",
    selectedClassName:
      "bg-pink-500 text-white shadow-[0_0_24px_rgba(236,72,153,0.25)]",
  },
  {
    id: "hombre" as const,
    label: "Hombre",
    selectedClassName:
      "bg-blue-500 text-white shadow-[0_0_24px_rgba(59,130,246,0.25)]",
  },
];

export default function GenderSelector({
  myGender,
  theirGender,
  onSelectMyGender,
  onSelectTheirGender,
  disabled,
}: GenderSelectorProps) {
  return (
    <div className="space-y-4">
      {/* Mi género */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Vos sos...
        </label>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="flex gap-3"
        >
          {genders.map((gender) => (
            <motion.button
              key={`my-${gender.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectMyGender(gender.id)}
              disabled={disabled}
              className={`flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                myGender === gender.id
                  ? gender.selectedClassName
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              {gender.label}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Género de la otra persona */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Le estás hablando a...
        </label>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3"
        >
          {genders.map((gender) => (
            <motion.button
              key={`their-${gender.id}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectTheirGender(gender.id)}
              disabled={disabled}
              className={`flex-1 rounded-lg px-6 py-3 text-sm font-medium transition-all ${
                theirGender === gender.id
                  ? gender.selectedClassName
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              } ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
            >
              {gender.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
