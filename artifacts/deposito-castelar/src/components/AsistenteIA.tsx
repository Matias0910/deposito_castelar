import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


// Tipos para el historial del chat
interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[]; // El texto de la respuesta
  eventoPdf?: string; // Nombre del archivo PDF del evento
  planos?: string[]; // Array opcional con los números de plano
}

// Leemos la URL de la API desde las variables de entorno de Vite.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const AsistenteIA: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Estado para manejar el modal del visor de PDF
  const [pdfActivo, setPdfActivo] = useState<string | null>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Cuando el transcript (texto reconocido) cambia, actualizamos el input.
  useEffect(() => {
    setInput(transcript);
  }, [transcript]);

  // Función para abrir el plano en el modal
  const abrirModalPlano = (numeroPlano: string) => {
    // El backend ya nos da el nombre completo del archivo (ej: "SFM05"), 
    // solo necesitamos construir la URL completa.
    const urlPdf = `${API_URL}/planos/${numeroPlano}.pdf`;
    setPdfActivo(urlPdf);
  };

  const abrirModalEvento = (nombreArchivoPdf?: string) => {
    if (!nombreArchivoPdf) return;
    // Apunta al puerto 3001 del backend y a la ruta estática /eventos/
    const urlPdf = `${API_URL}/eventos/${encodeURIComponent(nombreArchivoPdf)}`;
    setPdfActivo(urlPdf); 
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', parts: [{ text: input }] };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    resetTranscript(); // Limpiamos el transcript después de enviar
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
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
      // Ahora guardamos tanto el texto como los datos de los planos
      const modelMessage: ChatMessage = { 
        role: 'model', 
        parts: [{ text: data.reply }],
        eventoPdf: data.fallaData?.eventoPdf, // Guardamos el PDF de evento
        planos: data.fallaData?.planos || [] // Guardamos los planos que vienen en fallaData
      };
      
      setMessages(prevMessages => [...prevMessages, modelMessage]);

    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      const errorMessage: ChatMessage = { role: 'model', parts: [{ text: "Lo siento, hubo un error al conectar con el asistente. Por favor, intenta de nuevo." }] };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
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
            wordWrap: 'break-word',
          }}>
            {/* Usamos pre-wrap para respetar los saltos de línea de la IA */}
            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.parts[0].text}</div>

            {/* Si el mensaje del modelo incluye un PDF de evento, mostramos el botón */}
            {msg.role === 'model' && msg.eventoPdf && (
              <div className="contenedor-evento-pdf" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => abrirModalEvento(msg.eventoPdf)}
                  style={{
                    backgroundColor: '#d9534f', color: 'white', border: 'none',
                    padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
                  }}
                >
                  📄 Ver Manual de Evento
                </button>
              </div>
            )}

            {/* Si el mensaje del modelo incluye planos, mostramos los botones */}
            {msg.role === 'model' && msg.planos && msg.planos.length > 0 && (
              <div className="contenedor-planos" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', width: '100%' }}>Planos de referencia:</span>
                {msg.planos.map((numPlano) => (
                  <button
                    key={numPlano}
                    onClick={() => abrirModalPlano(numPlano)}
                    style={{
                      backgroundColor: '#0056b3', color: 'white', border: 'none',
                      padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
                    }}
                  >
                    Plano {numPlano}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', background: '#e9ecef', padding: '10px 15px', borderRadius: '15px' }}>
            ...
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', alignItems: 'center', padding: '10px', borderTop: '1px solid #ccc', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Pregúntame sobre fallas, planos o procedimientos..."
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }}
          disabled={isLoading}
        />
        
        {/* Botones para el micrófono */}
        {browserSupportsSpeechRecognition && (
          <div style={{ display: 'flex', gap: '5px' }}>
            <button 
              type="button" 
              onClick={() => SpeechRecognition.startListening({ continuous: true, language: 'es-AR' })} 
              disabled={listening || isLoading}
              style={{ padding: '10px', borderRadius: '50%', border: 'none', background: listening ? '#dc3545' : '#28a745', color: 'white', cursor: 'pointer', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Grabar comando"
            >🎤</button>
            <button 
              type="button" 
              onClick={() => SpeechRecognition.stopListening()} 
              disabled={!listening || isLoading}
              style={{ padding: '10px', borderRadius: '50%', border: 'none', background: '#6c757d', color: 'white', cursor: 'pointer', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Detener grabación"
            >⏹️</button>
          </div>
        )}
        <button type="submit" disabled={isLoading || !input.trim()} style={{ padding: '10px 20px', borderRadius: '20px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' }}>
          Enviar
        </button>
      </form>

      {/* Modal para el visor de PDF */}
      {pdfActivo && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div className="modal-content" style={{ width: '80%', height: '90vh', backgroundColor: 'white', display: 'flex', flexDirection: 'column', borderRadius: '8px', padding: '10px' }}>
            <button onClick={() => setPdfActivo(null)} style={{ alignSelf: 'flex-end', padding: '5px 10px', cursor: 'pointer', border: 'none', background: 'transparent', fontSize: '1.2rem' }}>Cerrar ❌</button>
            <iframe src={pdfActivo} title="Visor de Plano" style={{ width: '100%', height: '100%', border: 'none' }} />
          </div>
        </div>
      )}
    </div>
  );
};