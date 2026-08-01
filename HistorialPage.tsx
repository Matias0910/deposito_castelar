import React from 'react';
import HistorialPlanillas from './HistorialPlanillas'; // Ruta de importación corregida
import { OficioId } from '@/lib/definitions';

interface HistorialPageProps {
  // Define props for HistorialPage if any
  selectedOficio: OficioId | 'todos';
}

const HistorialPage: React.FC<HistorialPageProps> = ({ selectedOficio }) => {
  const handleCargar = (data: any) => {
    console.log('Cargando data:', data);
  };

  return (
    <div>
      <HistorialPlanillas selectedOficio={selectedOficio} onCargar={handleCargar} />
    </div>
  );
};

export default HistorialPage;