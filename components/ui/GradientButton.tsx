"use client";

import { motion } from "framer-motion";
import { ButtonHTMLAttributes } from "react";

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function GradientButton({
  children,
  className = "",
  disabled,
  ...props
}: GradientButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      className="relative w-full"
    >
      <button
        disabled={disabled}
        className={`
          gradient-border-button
          relative w-full rounded-lg bg-background px-6 py-5 
          text-lg font-medium text-foreground
          transition-all duration-300
          disabled:cursor-not-allowed disabled:opacity-50
          ${disabled ? "" : "before:animate-gradient-rotate"}
          ${className}
        `}
        style={{
          boxShadow: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.1)'
        }}
        {...props}
      >
        {/* Contenido del botón */}
        <span className="relative z-10">{children}</span>
      </button>
    </motion.div>
  );
}
