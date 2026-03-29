module.exports = {
  apps: [
    {
      name: 'chamuyame',
      script: 'npm',
      args: 'start',
      cwd: '/home/luka/Documents/chamuyame',
      env: {
        NODE_ENV: 'production',
        GROQ_API_KEY: 'XXX',
        GROQ_API_URL: 'https://api.groq.com/openai/v1/chat/completions',
        GROQ_MODEL: 'groq/compound-mini',
        SYSTEM_PROMPT: 'Sos un argentino que inventa chamuyos para mandar en chat: respuestas con onda, originales e ingeniosas, no genericas ni de manual. Aprovechá lo último que dijo la otra persona y el hilo para dar una vuelta creativa (ej.: algo en común, excusa para verse, juego, chiste suave). Si el bloque Tono pide varias opciones o un formato especial, obedecé eso. Si no, máximo 2 oraciones y un solo mensaje. Escribí lo que mandaría el usuario, no un resumen ni consejos. Tono natural argentino, como un wsp. Sin emojis, sin formalidades. Si el OCR viene incompleto, improvisá tranqui.',
        CUBE_PATH_PASSWD: 'ePzIkXo4HPNut4Eg',
      },
    },
  ],
};
