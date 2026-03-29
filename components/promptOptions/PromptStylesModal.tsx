"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2, X } from "lucide-react";
import {
  defaultTonePrompts,
  sanitizeTonePromptOverrides,
  sanitizeTonePromptValue,
  toneOptions,
  type ToneId,
  type TonePromptOverrides,
} from "@/lib/tone-options";

interface PromptStylesModalProps {
  open: boolean;
  onClose: () => void;
  selectedTone: ToneId | null;
  overrides: TonePromptOverrides;
  onSave: (nextOverrides: TonePromptOverrides) => void;
  disabled?: boolean;
}

export default function PromptStylesModal({
  open,
  onClose,
  selectedTone,
  overrides,
  onSave,
  disabled,
}: PromptStylesModalProps) {
  const [drafts, setDrafts] = useState<Record<ToneId, string>>(() =>
    toneOptions.reduce(
      (acc, tone) => {
        acc[tone.id] = overrides[tone.id] || defaultTonePrompts[tone.id];
        return acc;
      },
      {} as Record<ToneId, string>
    )
  );

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const tonePreviews = useMemo(
    () =>
      toneOptions.map((tone) => ({
        ...tone,
        currentPrompt: drafts[tone.id],
      })),
    [drafts]
  );

  const hasUnsavedChanges = useMemo(() => {
    const sanitizedDrafts = sanitizeTonePromptOverrides(drafts);
    const sanitizedOverrides = sanitizeTonePromptOverrides(overrides);

    return JSON.stringify(sanitizedDrafts) !== JSON.stringify(sanitizedOverrides);
  }, [drafts, overrides]);

  const handlePromptChange = (toneId: ToneId, value: string) => {
    setDrafts((current) => ({
      ...current,
      [toneId]: value,
    }));
  };

  const resetTone = (toneId: ToneId) => {
    setDrafts((current) => ({
      ...current,
      [toneId]: defaultTonePrompts[toneId],
    }));
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 280, damping: 26 }}
          className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Settings2 className="h-4 w-4" />
                Estilos de prompting
              </div>
              <h2 className="text-xl text-foreground">Que hace cada estilo y como editarlo</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Cada estilo cambia la actitud con la que se arma la respuesta. Si queres,
                podes reescribir la instruccion de cualquier estilo y queda guardada en este
                navegador.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-muted p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              aria-label="Cerrar popup"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[calc(90vh-152px)] space-y-4 overflow-y-auto px-6 py-5">
            {tonePreviews.map((tone) => {
              const isCustomized =
                sanitizeTonePromptValue(drafts[tone.id]) !== defaultTonePrompts[tone.id];
              const isSelected = selectedTone === tone.id;

              return (
                <section
                  key={tone.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base text-foreground">{tone.label}</h3>
                        {isSelected && (
                          <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-foreground">
                            seleccionado
                          </span>
                        )}
                        {isCustomized && (
                          <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-accent-foreground">
                            editado
                          </span>
                        )}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {tone.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => resetTone(tone.id)}
                      disabled={disabled || !isCustomized}
                      className="rounded-full bg-muted px-3 py-2 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Restaurar default
                    </button>
                  </div>

                  <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Instruccion para el modelo
                  </label>
                  <textarea
                    value={tone.currentPrompt}
                    onChange={(event) => handlePromptChange(tone.id, event.target.value)}
                    disabled={disabled}
                    rows={3}
                    className="min-h-28 w-full rounded-2xl border border-white/10 bg-background px-4 py-3 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/50 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </section>
              );
            })}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-muted px-4 py-3 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Cerrar
            </button>
            {hasUnsavedChanges && (
              <button
                type="button"
                onClick={() => {
                  onSave(sanitizeTonePromptOverrides(drafts));
                  onClose();
                }}
                disabled={disabled}
                className="rounded-xl bg-primary px-4 py-3 text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Guardar
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
