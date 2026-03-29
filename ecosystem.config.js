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
        SYSTEM_PROMPT: 'Escribí como un pibe argentino normal que sabe chamuyar. Soná natural, concreto y seguro. No uses frases raras, grandilocuentes, neutras ni de vendedor. No hagas promesas, retos ni metáforas boludas. Basate primero en la conversación real y usá los ejemplos solo para tomar tono y actitud. Si hay lugar, llevá la charla a verse o tomar algo de forma simple y natural. Voseo argentino. Sin emojis. Una o dos oraciones cortas.',
        TONO_CHAMUYERO_SUAVE: 'Natural, liviano y con intención.',
        TONO_CHAMUYERO_ATREVIDO: 'Seguro y directo, sin exagerar.',
        TONO_CHAMUYERO_PICANTE: 'Picante pero creíble.',
        TONO_CHAMUYERO_ROMANTICO: 'Dulce y genuino.',
        TONO_CHAMUYERO_DIVERTIDO: 'Con humor, pero natural.',
        CUBE_PATH_PASSWD: 'ePzIkXo4HPNut4Eg',
      },
    },
  ],
};
