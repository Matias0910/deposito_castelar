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
  // Agregamos el path al PDF de eventos si lo tuvieras en la DB
  // Si no, lo construiremos dinámicamente
  pdfPath?: string;
}

export const BuscadorArchivosFallas: React.FC = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState<Falla[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchFallas = async () => {
      setCargando(true);
      // Llamamos a nuestra nueva API. La búsqueda se pasa como un parámetro 'q'.
      const res = await fetch(`/api/fallas?q=${busqueda}`);
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
            // Construimos la ruta al PDF de evento. Asumimos una convención de nombres.
            // Ej: /Eventos/TCMS_Eventos.pdf
            const pdfEventoPath = item.pdfPath || `/Eventos/${item.categoria.toUpperCase()}_Eventos.pdf`;
            // Asumimos que el campo 'plano' en la DB contiene el nombre del archivo del plano.
            const planoPath = item.plano ? `/Planos/${item.plano}` : '';

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
                    <a href={pdfEventoPath} target="_blank" rel="noopener noreferrer" style={{ padding: '8px 12px', background: '#d9534f', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontSize: '14px', fontWeight: 'bold' }}>
                      📄 Ver PDF Evento
                    </a>
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
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
