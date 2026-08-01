"use client"

import { useCallback, useEffect, useState } from "react"
import { getEmptyObservaciones } from "./observaciones"
import type { PlanillaTipo } from "./planillas"
export type { PlanillaTipo } from "./planillas"; 

export type Estado = "si" | "no" | ""

export interface ItemEntry {
  estado: Estado
  obs: string
  precintoTC1?: string
  precintoTC2?: string
  odometroTC1?: string
  odometroTC2?: string
  tensionFlotanteTC1Cajon1?: string
  tensionFlotanteTC1Cajon2?: string
  tensionFlotanteTC2Cajon1?: string
  tensionFlotanteTC2Cajon2?: string
  nroCompresorTC1?: string
  nroCompresorTC2?: string
  anexoMecanico?: Record<string, Record<string, string>>
  anexoBaterias?: Record<string, Record<string, string>>
}

export interface FilaObservacion {
  id: number
  coche: string
  simaf: string
  tarea: string
  observacion: string
}

export interface ObservacionesGenerales {
  filas: FilaObservacion[]
  // Se pueden agregar más campos a futuro si es necesario
}

export interface PlanillaHeader {
  kilometraje: string
  ordenTrabajo: string
  fechaIngreso: string
  fechaEgreso: string
}

export interface PlanillaRecord {
  header: PlanillaHeader
  entries: Record<string, ItemEntry>
  observaciones: ObservacionesGenerales
  updatedAt: string
}

const emptyHeader: PlanillaHeader = {
  kilometraje: "",
  ordenTrabajo: "",
  fechaIngreso: "",
  fechaEgreso: "",
}

function storageKey(equipoId: number, tipo: PlanillaTipo) {
  return `cartillas:v1:${equipoId}:${tipo}`
}

export function loadRecord(equipoId: number, tipo: PlanillaTipo): PlanillaRecord {
  if (typeof window === "undefined") {
    return { header: emptyHeader, entries: {}, observaciones: getEmptyObservaciones(tipo), updatedAt: "" }
  }
  try {
    const raw = window.localStorage.getItem(storageKey(equipoId, tipo))
    if (raw) {
      const parsed = JSON.parse(raw) as any
      const observaciones = parsed.observaciones ?? getEmptyObservaciones(tipo);

      // Limpiamos los campos que ya no existen para evitar datos basura
      if (parsed.header) {
        delete parsed.header.linea
        delete parsed.header.taller
      }
      return {
        header: { ...emptyHeader, ...parsed.header },
        entries: parsed.entries ?? {},
        observaciones: observaciones,
        updatedAt: parsed.updatedAt ?? "",
      } as PlanillaRecord
    }
  } catch {
    // ignore
  }
  return { header: emptyHeader, entries: {}, observaciones: getEmptyObservaciones(tipo), updatedAt: "" }
}

export function useMantenimiento(equipoId: number, tipo: PlanillaTipo) {
  const getEmptyRecord = (): PlanillaRecord => ({ header: emptyHeader, entries: {}, observaciones: getEmptyObservaciones(tipo), updatedAt: "" });

  const [record, setRecord] = useState<PlanillaRecord>(getEmptyRecord)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setRecord(loadRecord(equipoId, tipo))
    setLoaded(true)
  }, [equipoId, tipo])

  const persist = useCallback(
    (next: PlanillaRecord) => {
      const withStamp = { ...next, updatedAt: new Date().toISOString() }
      setRecord(withStamp)
      try {
        window.localStorage.setItem(storageKey(equipoId, tipo), JSON.stringify(withStamp))
      } catch {
        // ignore
      }
    },
    [equipoId, tipo],
  )

  const guardarEnHistorial = useCallback(async () => {
    // Creamos un objeto que también incluya el tipo de planilla y el equipo,
    // que son datos importantes para el historial.
    const planillaParaGuardar = {
      ...record,
      tipoPlanilla: tipo,
      equipo: equipoId,
    };

    try {
      const response = await fetch('http://localhost:3001/api/planillas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planillaParaGuardar),
      });

      if (!response.ok) {
        // Si la API falla, lanzamos un error para manejarlo en la UI.
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al guardar la planilla en el servidor');
      }

      return await response.json();
    } catch (error) {
      console.error("Error en guardarEnHistorial:", error);
      throw error; // Re-lanzamos el error para que el componente que lo llama se entere.
    }
  }, [record, equipoId, tipo]);

  const setEstado = useCallback(
    (code: string, estado: Estado) => {
      setRecord((prev) => {
        const current = prev.entries[code] ?? { estado: "", obs: "" }
        const nextEstado: Estado = current.estado === estado ? "" : estado
        const next: PlanillaRecord = {
          ...prev,
          entries: { ...prev.entries, [code]: { ...current, estado: nextEstado } },
          updatedAt: new Date().toISOString(),
        }
        try {
          window.localStorage.setItem(storageKey(equipoId, tipo), JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [equipoId, tipo],
  )

  const setField = useCallback(
    (code: string, field: keyof ItemEntry, value: string) => {
      setRecord((prev) => {
        const current = prev.entries[code] ?? { estado: "", obs: "" }
        const next: PlanillaRecord = {
          ...prev,
          entries: { ...prev.entries, [code]: { ...current, [field]: value } },
          updatedAt: new Date().toISOString(),
        }
        try {
          window.localStorage.setItem(storageKey(equipoId, tipo), JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [equipoId, tipo],
  )

  const setHeader = useCallback(
    (field: keyof PlanillaHeader, value: string) => {
      setRecord((prev) => {
        const next: PlanillaRecord = { ...prev, header: { ...prev.header, [field]: value }, updatedAt: new Date().toISOString() }
        try {
          window.localStorage.setItem(storageKey(equipoId, tipo), JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [equipoId, tipo],
  )

  const setObservacion = useCallback(
    (id: number, campo: keyof FilaObservacion, valor: string) => {
      setRecord((prev) => {
        const nextFilas = prev.observaciones.filas.map((f) => (f.id === id ? { ...f, [campo]: valor } : f))
        const next: PlanillaRecord = {
          ...prev,
          observaciones: { ...prev.observaciones, filas: nextFilas },
          updatedAt: new Date().toISOString(),
        }
        try {
          window.localStorage.setItem(storageKey(equipoId, tipo), JSON.stringify(next))
        } catch {
          // ignore
        }
        return next
      })
    },
    [equipoId, tipo],
  )

  const reset = useCallback(() => {
    persist(getEmptyRecord())
  }, [persist])

  const cargarRegistroDesdeHistorial = useCallback((registro: PlanillaRecord) => {
    // Usamos la función persist para actualizar el estado y el localStorage
    persist(registro);
  }, [persist]);

  return { record, loaded, setEstado, setField, setHeader, setObservacion, reset, guardarEnHistorial, cargarRegistroDesdeHistorial };
}
