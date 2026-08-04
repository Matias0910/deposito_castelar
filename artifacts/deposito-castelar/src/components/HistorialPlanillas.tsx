'use client';

import { useEffect, useState } from "react"
import { History, Calendar, Train, Trash2, Eye } from "lucide-react"
import type { PlanillaRecord, PlanillaTipo } from "@/lib/store";
import { PLANILLAS } from "@/lib/planillas";
import { OFICIOS } from "@/lib/oficios";
import { cn } from "@/lib/utils";

// El tipo de dato que esperamos para cada planilla en el historial
interface PlanillaHistorial extends PlanillaRecord {
  _id: string;
  tipoPlanilla: PlanillaTipo;
  equipo: number;
  createdAt: string;
  updatedAt: string;
}

// Leemos la URL de la API desde las variables de entorno de Vite.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface HistorialPlanillasProps {
  onCargar?: (id: string) => void;
}

export function HistorialPlanillas({}: HistorialPlanillasProps) {
  const [planillas, setPlanillas] = useState<PlanillaHistorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlanilla, setSelectedPlanilla] = useState<PlanillaHistorial | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/api/planillas`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPlanillas(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("No se pudo cargar el historial. Revisa la conexión con el servidor.");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta planilla? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/planillas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la planilla desde el servidor.');
      }

      setPlanillas(planillas.filter(p => p._id !== id));
      alert("Planilla eliminada con éxito.");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (selectedPlanilla) {
    const currentPlanillaDefinition = PLANILLAS[selectedPlanilla.tipoPlanilla];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
          <button
            onClick={() => setSelectedPlanilla(null)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          >
            Cerrar X
          </button>
          <h2 className="text-2xl font-bold mb-4">Detalle de Planilla Histórica</h2>
          
          <div className="mb-4 p-4 border rounded-md bg-gray-50">
            <p className="text-lg font-semibold">Equipo: {selectedPlanilla.equipo}</p>
            <p className="text-md">Tipo de Planilla: {currentPlanillaDefinition?.nombre || selectedPlanilla.tipoPlanilla}</p>
            <p className="text-sm text-gray-600">Guardado: {new Date(selectedPlanilla.createdAt).toLocaleString("es-AR")}</p>
            <p className="text-sm text-gray-600">Última Actualización: {new Date(selectedPlanilla.updatedAt).toLocaleString("es-AR")}</p>
          </div>

          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Datos de la Cartilla</h3>
            <p><span className="font-medium">Kilometraje:</span> {selectedPlanilla.header?.kilometraje || 'N/A'}</p>
            <p><span className="font-medium">Orden de Trabajo:</span> {selectedPlanilla.header?.ordenTrabajo || 'N/A'}</p>
            <p><span className="font-medium">Fecha Ingreso:</span> {selectedPlanilla.header?.fechaIngreso || 'N/A'}</p>
            <p><span className="font-medium">Fecha Egreso:</span> {selectedPlanilla.header?.fechaEgreso || 'N/A'}</p>
          </div>

          <div className="mb-4 p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Ítems de Checklist</h3>
            {currentPlanillaDefinition?.sections.map(section => (
              <div key={section.id} className="mb-4">
                <h4 className="text-lg font-bold mb-2">{section.group} - {section.title}</h4>
                {section.subgroups.map(subgroup => (
                  <div key={subgroup.code} className="ml-4 mb-2">
                    <h5 className="text-md font-semibold mb-1">{subgroup.title}</h5>
                    <ul className="list-disc list-inside">
                      {subgroup.items.map(item => {
                        const entry = selectedPlanilla.entries?.[item.code] as any;
                        const estado = entry?.estado || 'N/A';
                        const field = entry?.field || entry?.valor || 'N/A';
                        const oficioLabel = OFICIOS.find(o => o.id === item.oficio)?.label || item.oficio;
                        return (
                          <li key={item.code} className="text-sm mb-1">
                            <span className="font-medium">{item.label} ({oficioLabel}):</span> {item.detail} <br/>
                            <span className={cn("font-bold", String(estado).match(/si|ok/i) ? "text-green-600" : String(estado).match(/no|nok/i) ? "text-red-600" : "text-gray-500")}>Estado: {estado}</span>
                            {field !== 'N/A' && field !== '' && <span> - Valor: {field}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 border rounded-md">
            <h3 className="text-xl font-semibold mb-2">Observaciones Generales</h3>
            {selectedPlanilla.observaciones?.filas && selectedPlanilla.observaciones.filas.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedPlanilla.observaciones.filas.map((fila, idx) => (
                  <li key={idx} className="text-sm">{fila.observacion}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No hay observaciones.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <History className="size-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight">Historial de Planillas Guardadas</h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Registro histórico de las cartillas de mantenimiento almacenadas en el sistema.
        </p>
      </header>

      {loading ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          Cargando historial...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-destructive bg-destructive/10 p-8 text-center text-sm text-destructive">{error}</div>
      ) : planillas.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No hay planillas guardadas todavía.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {planillas.map((item) => (
            <div key={item._id} className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  <Train className="size-3.5" /> Equipo {item.equipo}
                </span>
                <span className="text-xs uppercase tracking-wider font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                  {item.tipoPlanilla}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="font-medium">Orden de Trabajo:</span> {item.header?.ordenTrabajo || 'N/A'}</p>
                <p><span className="font-medium">Kilometraje:</span> {item.header?.kilometraje || 'N/A'}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1 pt-1">
                  <Calendar className="size-3.5" /> Guardado: {new Date(item.createdAt).toLocaleString("es-AR")}
                </p>
              </div>
              <div className="border-t border-border pt-3 flex justify-end gap-4">
                <button
                  onClick={() => setSelectedPlanilla(item)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary/80 hover:text-primary transition-colors"
                >
                  <Eye className="size-3.5" /> Ver
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive/80 hover:text-destructive transition-colors"
                >
                  <Trash2 className="size-3.5" /> Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}