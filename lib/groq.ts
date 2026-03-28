const GROQ_API_URL =
  process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";

interface ChamuyarRequest {
  textoConversacion: string;
  contexto: string;
  tono?: string;
}

interface ChamuyarResponse {
  respuesta: string;
  error?: string;
}

function getTonePrompts(): Record<string, string> {
  return {
    casual: process.env.TONO_CASUAL || "Con un amigo, tranqui y simple",
    formal: process.env.TONO_FORMAL || "Algo serio pero no robot",
    divertido: process.env.TONO_DIVERTIDO || "Con onda, capaz un chiste",
    serio: process.env.TONO_SERIO || "Directo, sin vueltas",
    atrevido: process.env.TONO_ATREVIDO || "Coqueto, confiado, seductor",
  };
}

function getSystemPrompt(): string {
  return (
    process.env.SYSTEM_PROMPT ||
    "Sos un argentino que ayuda a responder mensajes de chat. REGLAS: Maximo 2 oraciones. Tono natural argentino, como un wsp normal. Sin emojis, sin formalidades. Si no hay contexto, respondé tranqui."
  );
}

export async function chamuyar(
  request: ChamuyarRequest
): Promise<ChamuyarResponse> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { respuesta: "", error: "Falta GROQ_API_KEY en el entorno" };
  }

  const tonePrompts = getTonePrompts();
  const toneInstruction = request.tono ? tonePrompts[request.tono] : "";

  const userPrompt = `Conversación:
${request.textoConversacion}

Tono: ${toneInstruction || "casual"}
${request.contexto ? `Contexto: ${request.contexto}` : ""}

Respuesta:`;

  try {
    const model = process.env.GROQ_MODEL || "groq/compound-mini";

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: getSystemPrompt() },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Error ${response.status}`
      );
    }

    const data = await response.json();
    let respuesta = data.choices?.[0]?.message?.content?.trim() || "";

    respuesta = respuesta.replace(/^["']|["']$/g, "").replace(/\n+$/, "");

    return { respuesta };
  } catch (error) {
    console.error("Error:", error);
    return {
      respuesta: "",
      error: error instanceof Error ? error.message : "Error",
    };
  }
}
