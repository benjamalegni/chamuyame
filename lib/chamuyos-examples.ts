/**
 * Base de datos de chamuyos argentinos reales
 * Los chamuyos se cargan desde data/chamuyos.json
 */

import chamuyosData from "@/data/chamuyos.json";

export type Genero = "varon" | "mujer" | "neutro";

export interface ChamuyoExample {
  chamuyo: string;
  categoria: "suave" | "atrevido" | "picante" | "romantico" | "divertido";
  genero_emisor: Genero;
  genero_destinatario: Genero;
  contexto?: string;
}

export const chamuyosExamples: ChamuyoExample[] = chamuyosData.chamuyos as ChamuyoExample[];

/**
 * Obtiene ejemplos de chamuyos según la categoría y géneros
 */
export function getChamuyoExamples(
  categoria?: "suave" | "atrevido" | "picante" | "romantico" | "divertido",
  generoEmisor?: "varon" | "mujer",
  generoDestinatario?: "varon" | "mujer",
  limit: number = 3
): ChamuyoExample[] {
  let filtered = chamuyosExamples;

  // Filtrar por categoría
  if (categoria) {
    filtered = filtered.filter((c) => c.categoria === categoria);
  }

  // Filtrar por género del emisor (quien usa la app)
  if (generoEmisor) {
    filtered = filtered.filter(
      (c) => c.genero_emisor === generoEmisor || c.genero_emisor === "neutro"
    );
  }

  // Filtrar por género del destinatario (con quien habla)
  if (generoDestinatario) {
    filtered = filtered.filter(
      (c) =>
        c.genero_destinatario === generoDestinatario ||
        c.genero_destinatario === "neutro"
    );
  }

  // Shuffle y tomar solo 'limit' ejemplos
  return filtered.sort(() => Math.random() - 0.5).slice(0, limit);
}

/**
 * Formatea ejemplos para incluir en el prompt
 */
export function formatExamplesForPrompt(examples: ChamuyoExample[]): string {
  if (examples.length === 0) return "";

  return `Ejemplos:\n${examples
    .map((e, i) => `${i + 1}. "${e.chamuyo}"`)
    .join("\n")}`;
}
