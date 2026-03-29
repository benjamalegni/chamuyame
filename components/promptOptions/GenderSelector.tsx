"use client";

import { motion } from "framer-motion";

interface GenderSelectorProps {
  myGender: "mujer" | "varon" | null;
  theirGender: "mujer" | "varon" | null;
  onSelectMyGender: (gender: "mujer" | "varon") => void;
  onSelectTheirGender: (gender: "mujer" | "varon") => void;
  disabled?: boolean;
}

const genders = [
  { id: "mujer" as const, label: "Mujer" },
  { id: "varon" as const, label: "Varón" },
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
                  ? "bg-primary text-primary-foreground"
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
                  ? "bg-primary text-primary-foreground"
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
