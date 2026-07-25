"use client"

import { useCallback, useEffect, useState } from "react"
import type { PlanillaTipo } from "./planillas"

export type Estado = "si" | "no" | ""

export interface ItemEntry {
  estado: Estado
  obs: string
  precintoTC1?: string
  precintoTC2?: string
  odometroTC1?: string
  odometroTC2?: string
  nroCompresorTC1?: string
  nroCompresorTC2?: string
}

export interface PlanillaHeader {
  linea: string
  kilometraje: string
  taller: string
  ordenTrabajo: string
  fechaIngreso: string
  fechaEgreso: string
  supervisor: string
  legajo: string
}

export interface PlanillaRecord {
  header: PlanillaHeader
  entries: Record<string, ItemEntry>
  updatedAt: string
}

const emptyHeader: PlanillaHeader = {
  linea: "",
  kilometraje: "",
  taller: "",
  ordenTrabajo: "",
  fechaIngreso: "",
  fechaEgreso: "",
  supervisor: "",
  legajo: "",
}

function storageKey(equipoId: number, tipo: PlanillaTipo) {
  return `cartillas:v1:${equipoId}:${tipo}`
}

export function loadRecord(equipoId: number, tipo: PlanillaTipo): PlanillaRecord {
  if (typeof window === "undefined") {
    return { header: emptyHeader, entries: {}, updatedAt: "" }
  }
  try {
    const raw = window.localStorage.getItem(storageKey(equipoId, tipo))
    if (raw) {
      const parsed = JSON.parse(raw) as PlanillaRecord
      return { header: { ...emptyHeader, ...parsed.header }, entries: parsed.entries ?? {}, updatedAt: parsed.updatedAt ?? "" }
    }
  } catch {
    // ignore
  }
  return { header: emptyHeader, entries: {}, updatedAt: "" }
}

export function useMantenimiento(equipoId: number, tipo: PlanillaTipo) {
  const [record, setRecord] = useState<PlanillaRecord>(() => ({ header: emptyHeader, entries: {}, updatedAt: "" }))
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

  const reset = useCallback(() => {
    persist({ header: emptyHeader, entries: {}, updatedAt: "" })
  }, [persist])

  return { record, loaded, setEstado, setField, setHeader, reset }
}
