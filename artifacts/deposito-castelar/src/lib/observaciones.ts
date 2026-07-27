import type { ObservacionesGenerales } from "./store";
import type { PlanillaTipo } from "./planillas";

export const OBSERVACIONES_QUINCENAL: ObservacionesGenerales = {
    filas: [
      { id: 1, coche: "TC1", simaf: "", tarea: "", observacion: "" },
      { id: 2, coche: "M1-1", simaf: "", tarea: "", observacion: "" },
      { id: 3, coche: "M2-1", simaf: "", tarea: "", observacion: "" },
      { id: 4, coche: "T3", simaf: "", tarea: "", observacion: "" },
      { id: 5, coche: "M1-2", simaf: "", tarea: "", observacion: "" },
      { id: 6, coche: "M2-2", simaf: "", tarea: "", observacion: "" },
      { id: 7, coche: "M3", simaf: "", tarea: "", observacion: "" },
      { id: 8, coche: "M4", simaf: "", tarea: "", observacion: "" },
      { id: 9, coche: "TC2", simaf: "", tarea: "", observacion: "" },
      { id: 10, coche: "", simaf: "", tarea: "", observacion: "" },
    ],
};

export const OBSERVACIONES_BIMESTRAL: ObservacionesGenerales = {
    filas: [
      { id: 1, coche: "TC1", simaf: "", tarea: "", observacion: "" },
      { id: 2, coche: "M1-1", simaf: "", tarea: "", observacion: "" },
      { id: 3, coche: "M2-1", simaf: "", tarea: "", observacion: "" },
      { id: 4, coche: "T3", simaf: "", tarea: "", observacion: "" },
      { id: 5, coche: "M1-2", simaf: "", tarea: "", observacion: "" },
      { id: 6, coche: "M2-2", simaf: "", tarea: "", observacion: "" },
      { id: 7, coche: "M3", simaf: "", tarea: "", observacion: "" },
      { id: 8, coche: "M4", simaf: "", tarea: "", observacion: "" },
      { id: 9, coche: "TC2", simaf: "", tarea: "", observacion: "" },
      { id: 10, coche: "", simaf: "", tarea: "", observacion: "" },
    ],
};

export function getEmptyObservaciones(tipo: PlanillaTipo): ObservacionesGenerales {
    const base = tipo === 'bimestral' ? OBSERVACIONES_BIMESTRAL : OBSERVACIONES_QUINCENAL;
    return JSON.parse(JSON.stringify(base));
}
