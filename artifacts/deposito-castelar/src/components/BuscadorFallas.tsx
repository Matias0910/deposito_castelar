'use client'; // Necesario para componentes que usan hooks como useState y useEffect

import React, { useState, useEffect } from 'react';

// Definimos un tipo para los datos que esperamos de la API
interface Falla {
  _id: string;
  categoria: string;
  evento: string;
  descripcion: string[];
  resolucion: string[];
  plano?: string;
  // El backend ahora nos enviará el nombre exacto del archivo PDF del evento
  eventoPdf?: string;
}

// Leemos la URL de la API desde las variables de entorno de Vite.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const BuscadorArchivosFallas: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<Falla[]>([]);
  const [cargando, setCargando] = useState(true);
  // Estado para manejar el modal del visor de PDF
  const [pdfActivo, setPdfActivo] = useState<string | null>(null);

  useEffect(() => {
    const fetchFallas = async () => {
      setCargando(true);
      // Llamamos a nuestra nueva API. La búsqueda se pasa como un parámetro 'q'.
      // Apuntamos a la URL completa de nuestro nuevo servidor API
      const res = await fetch(`${API_URL}/api/fallas?q=${busqueda}`);
      const data = await res.json();
      setResultados(data);
      setCargando(false);
    };

    // Hacemos la búsqueda 300ms después de que el usuario deja de escribir
    const timer = setTimeout(() => {
      fetchFallas();
    }, 300);

    return () => clearTimeout(timer); // Limpiamos el timer si el usuario sigue escribiendo
  }, [busqueda]);

  // Función para abrir el plano en el modal
  const abrirModalPlano = (numeroPlano: string) => {
    // Aplicar la misma lógica de formateo que en el backend para SFMXX.pdf
    const numeroFormateado = Number(numeroPlano) < 10 && !numeroPlano.startsWith('0') ? `0${numeroPlano}` : numeroPlano;
    const nombreArchivoPdf = `SFM${numeroFormateado}.pdf`;
    const urlPdf = `${API_URL}/planos/${nombreArchivoPdf}`;
    setPdfActivo(urlPdf);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>📂 Documentación y Planos de Fallas - Depósito Castelar</h2>

      <input 
        type="text" 
        placeholder="Buscar por categoría o nombre de evento..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: '10px', width: '100%', maxWidth: '400px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
      />

      <div style={{ display: 'grid', gap: '15px' }}>
        {cargando ? (
          <p>Cargando...</p>
        ) : (
          resultados.map((item) => {
            // Construimos la ruta al PDF de evento.
            // Usamos el nombre de archivo que nos provee el backend.
            let pdfEventoPath = '';
            if (item.eventoPdf) {
              pdfEventoPath = `${API_URL}/eventos/${encodeURIComponent(item.eventoPdf)}`;
            }

            // Si item.plano es una cadena con múltiples números (ej: "5, 6, 17"), tomamos el primero y lo formateamos.
            let planoPath = '';
            if (item.plano) {
              const numerosPlanos = item.plano.match(/\d+/g);
              if (numerosPlanos && numerosPlanos.length > 0) {
                  const primerNumero = numerosPlanos[0];
                  const numeroFormateado = Number(primerNumero) < 10 && !primerNumero.startsWith('0') ? `0${primerNumero}` : primerNumero;
                  // Usamos la URL completa del backend también para los planos.
                  planoPath = `${API_URL}/planos/SFM${numeroFormateado}.pdf`;
              }
            }

            return (
              <div key={item._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <div>
                    <span style={{ background: '#007bff', color: '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                      {item.categoria}
                    </span>
                    <h4 style={{ margin: '8px 0 0 0' }}>{item.evento}</h4>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {pdfEventoPath && (
                      <a href={pdfEventoPath} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: '#d9534f', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                        📄 Ver PDF Evento
                      </a>
                    )}
                    {planoPath && (
                      <a href={planoPath} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: '#5cb85c', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                        🗺️ Ver Plano
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: '14px', margin: '5px 0' }}><strong>Descripción:</strong> {item.descripcion.join(' ')}</p>
                  <p style={{ fontSize: '14px', margin: '5px 0' }}><strong>Resolución:</strong> {item.resolucion.join(' ')}</p>
                  
                  {/* Si la respuesta incluye planos, mostramos los botones interactivos */}
                  {item.plano && item.plano.match(/\d+/g) && (
                    <div className="contenedor-planos" style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Planos de referencia:</span>
                      {(item.plano.match(/\d+/g) || []).map((numPlano) => (
                        <button
                          key={numPlano}
                          onClick={() => abrirModalPlano(numPlano)}
                          style={{
                            backgroundColor: '#0056b3',
                            color: 'white',
                            border: 'none',
                            padding: '5px 10px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          Plano {numPlano}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

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
