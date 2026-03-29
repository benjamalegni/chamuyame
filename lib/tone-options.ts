export const toneOptions = [
  {
    id: "chamuyero_suave",
    label: "Suave",
    description:
      "Va liviano, natural y sin apurar. Sirve para abrir o seguir la charla sin quedar intenso.",
    defaultPrompt: "Natural, liviano y con intencion.",
  },
  {
    id: "chamuyero_atrevido",
    label: "Atrevido",
    description:
      "Marca mas seguridad y decision, pero sin sobrarse. Ideal cuando ya hay un poco de ida y vuelta.",
    defaultPrompt: "Seguro y directo, sin exagerar.",
  },
  {
    id: "chamuyero_picante",
    label: "Picante",
    description:
      "Sube la tension con un tono mas jugueton y sugerente. Conviene usarlo cuando ya hay confianza.",
    defaultPrompt: "Picante pero creible.",
  },
  {
    id: "chamuyero_romantico",
    label: "Romantico",
    description:
      "Apunta a algo mas dulce, cercano y genuino. Funciona cuando queres bajar un cambio y sonar mas sentido.",
    defaultPrompt: "Dulce y genuino.",
  },
  {
    id: "chamuyero_divertido",
    label: "Divertido",
    description:
      "Mete humor y frescura sin perder naturalidad. Va bien para destrabar una charla o aflojar tension.",
    defaultPrompt: "Con humor, pero natural.",
  },
] as const;

export type ToneId = (typeof toneOptions)[number]["id"];

export type TonePromptOverrides = Partial<Record<ToneId, string>>;

export const defaultTonePrompts: Record<ToneId, string> = toneOptions.reduce(
  (acc, tone) => {
    acc[tone.id] = tone.defaultPrompt;
    return acc;
  },
  {} as Record<ToneId, string>
);

export function sanitizeTonePromptValue(value: string): string {
  return value.replace(/\r\n/g, "\n").replace(/[ \t]+/g, " ").trim();
}

export function sanitizeTonePromptOverrides(
  overrides: unknown
): TonePromptOverrides {
  if (!overrides || typeof overrides !== "object") {
    return {};
  }

  return toneOptions.reduce((acc, tone) => {
    const rawValue = (overrides as Record<string, unknown>)[tone.id];

    if (typeof rawValue !== "string") {
      return acc;
    }

    const sanitizedValue = sanitizeTonePromptValue(rawValue);

    if (!sanitizedValue || sanitizedValue === defaultTonePrompts[tone.id]) {
      return acc;
    }

    acc[tone.id] = sanitizedValue;
    return acc;
  }, {} as TonePromptOverrides);
}
