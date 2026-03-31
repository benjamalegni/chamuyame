# Capturas
<img width="1869" height="870" alt="image" src="https://github.com/user-attachments/assets/1dcd3983-2396-418b-aa11-9e8ac2791218" />
<img width="1884" height="1779" alt="FireShot Capture 005 - Chamuyame - chamuyame chickenkiller com" src="https://github.com/user-attachments/assets/eada5f99-d9e0-451d-95b4-0d0f510b6824" />

# Chamuyame

Generador de respuestas para chats con tono argentino y estilo WhatsApp.

**Chamuyame** te ayuda a responder una conversación pegando el texto del chat o subiendo una captura de pantalla.  
Si subís una imagen, la app extrae el texto con OCR y lo usa como base para generar una respuesta.  
Además, permite elegir estilos de respuesta como **suave**, **atrevido**, **picante**, **romántico** y **divertido**.

## Demo

Sitio en producción: [https://chamuyame.chickenkiller.com/](https://chamuyame.chickenkiller.com/)

## Qué hace

- Pegar una conversación manualmente
- Subir una captura de pantalla del chat
- Extraer texto de la imagen con OCR
- Elegir género propio y de la otra persona
- Agregar tema y contexto opcionales
- Elegir un estilo de respuesta
- Editar las instrucciones internas de cada estilo y guardarlas en el navegador
- Generar una respuesta breve, natural y con voseo argentino

## Stack

- **Next.js 16**
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion**
- **Lucide React**
- **Tesseract.js** para OCR
- **Groq API** para generación de texto

## Cómo funciona

1. El usuario pega una conversación o sube una imagen.
2. Si hay imagen, se procesa con OCR (`spa+eng`) en el cliente.
3. La app arma un prompt con:
   - conversación
   - géneros seleccionados
   - tema y contexto
   - estilo elegido
   - reglas de lenguaje
   - ejemplos de tono
4. Se envía un `POST` a `/api/chamuyar`.
5. El backend consulta la API de Groq y devuelve una respuesta corta.

## Estructura del proyecto

```bash
.
├── app/
│   ├── api/chamuyar/
│   └── page.tsx
├── components/
├── data/
├── hooks/
├── lib/
├── public/
├── Dockerfile
├── docker-compose.yml
└── ecosystem.config.js
