module.exports = {
  apps: [
    {
      name: 'chamuyame',
      script: 'npm',
      args: 'start',
      cwd: '/home/luka/Documents/chamuyame',
      env: {
        NODE_ENV: 'production',
        GROQ_API_KEY: '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',
        GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
        GROQ_MODEL: 'groq/compound-mini',
        SYSTEM_PROMPT: 'Sos un argentino que ayuda a responder mensajes de chat. REGLAS: Maximo 2 oraciones. Tono natural argentino, como un wsp normal. Sin emojis, sin formalidades. Si no hay contexto, responde tranqui.',
        TONO_CASUAL: 'Con un amigo, tranqui y simple',
        TONO_FORMAL: 'Algo serio pero no robot',
        TONO_DIVERTIDO: 'Con onda, capaz un chiste',
        TONO_SERIO: 'Directo, sin vueltas',
        TONO_ATREVIDO: 'Coqueto, confiado, seductoor',
        CUBE_PATH_PASSWD: 'ePzIkXo4HPNut4Eg',
      },
    },
  ],
};
