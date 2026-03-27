const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";

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
  const tonePrompts = getTonePrompts();
  const toneInstruction = request.tono ? tonePrompts[request.tono] : "";

  const userPrompt = `Conversación:
${request.textoConversacion}

Tono: ${toneInstruction || "casual"}
${request.contexto ? `Contexto: ${request.contexto}` : ""}

Respuesta:`;

  try {
    const model = process.env.OLLAMA_MODEL || "llama3";
    
    const response = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: getSystemPrompt() },
          { role: "user", content: userPrompt },
        ],
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `Error ${response.status}`
      );
    }

    const data = await response.json();
    let respuesta = data.message?.content?.trim() || "";

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
