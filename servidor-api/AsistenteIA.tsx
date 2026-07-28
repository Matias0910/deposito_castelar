import React, { useState } from 'react';

// Tipos para el historial del chat
interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const AsistenteIA: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Enviamos el mensaje del usuario y el historial para que la IA tenga contexto
        body: JSON.stringify({ message: input, history: messages }),
      });

      if (!response.ok) {
        throw new Error('La respuesta de la API no fue exitosa');
      }

      const data = await response.json();
      const modelMessage: ChatMessage = { role: 'model', parts: [{ text: data.reply }] };
      
      setMessages([...newMessages, modelMessage]);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Lo siento, hubo un error al conectar con el asistente. Por favor, intenta de nuevo." }] };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', maxWidth: '700px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ padding: '10px 20px', borderBottom: '1px solid #ccc', margin: 0 }}>🤖 Asistente de Mantenimiento</h2>
      
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            background: msg.role === 'user' ? '#007bff' : '#e9ecef',
            color: msg.role === 'user' ? 'white' : 'black',
            padding: '10px 15px',
            borderRadius: '15px',
            maxWidth: '80%',
          }}>
            {msg.parts[0].text}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: '#e9ecef', padding: '10px 15px', borderRadius: '15px' }}>
            ...
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', padding: '10px', borderTop: '1px solid #ccc' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregúntame sobre fallas, planos o procedimientos..."
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc', marginRight: '10px' }}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}>
          Enviar
        </button>
      </form>
    </div>
  );
};

```

### Paso 3: Mostrar el Asistente en tu Aplicación

Para verlo, puedes crear una nueva "página" o ruta. Si estás usando `react-router-dom`, puedes añadir una nueva ruta. Si no, una forma sencilla es crear un archivo para la página del asistente.

1.  Crea un archivo `src/pages/AsistentePage.tsx` (si no tienes una carpeta `pages`, puedes crearla).
2.  Añade este contenido:

    ```typescriptreact
    import { AsistenteIA } from '../components/AsistenteIA';

    export function AsistentePage() {
      return (
        <main className="container mx-auto py-8">
          <AsistenteIA />
        </main>
      );
    }
    ```

3.  Finalmente, asegúrate de que tu `App.tsx` pueda mostrar esta página.

### Cómo Probarlo

1.  **Inicia tu servidor API** en su terminal (`npm start` en la carpeta `servidor-api`).
2.  **Inicia tu aplicación de React** en la otra terminal (`npm run dev`).
3.  Navega a la ruta donde hayas puesto el `AsistentePage`.

Ahora deberías ver la interfaz del chat. ¡Prueba a hacerle una pregunta!

<!--
[PROMPT_SUGGESTION]¿Cómo puedo hacer que el asistente consulte la base de datos de fallas para responder?[/PROMPT_SUGGESTION]
[PROMPT_SUGGESTION]¿Cómo puedo mejorar el estilo del chat para que se vea más moderno?[/PROMPT_SUGGESTION]
-->