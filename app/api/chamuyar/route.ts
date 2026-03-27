import { NextRequest, NextResponse } from "next/server";
import { chamuyar } from "@/lib/groq";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { textoConversacion, contexto, tono } = body;

    if (!textoConversacion || typeof textoConversacion !== "string") {
      return NextResponse.json(
        { error: "textoConversacion es requerido" },
        { status: 400 }
      );
    }

    const result = await chamuyar({
      textoConversacion,
      contexto: contexto || "",
      tono,
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ respuesta: result.respuesta });
  } catch (error) {
    console.error("Error en /api/chamuyar:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
