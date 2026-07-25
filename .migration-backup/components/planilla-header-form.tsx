"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { PlanillaHeader } from "@/lib/store"

interface PlanillaHeaderFormProps {
  header: PlanillaHeader
  onChange: (field: keyof PlanillaHeader, value: string) => void
}

const FIELDS: { key: keyof PlanillaHeader; label: string; type?: string; placeholder?: string }[] = [
  { key: "linea", label: "Línea", placeholder: "Ej. Mitre / Sarmiento" },
  { key: "kilometraje", label: "Kilometraje", placeholder: "Ej. 141349" },
  { key: "taller", label: "Taller / Depósito", placeholder: "Ej. Depósito Castelar" },
  { key: "ordenTrabajo", label: "Orden de Trabajo N°", placeholder: "Ej. 81996" },
  { key: "fechaIngreso", label: "Fecha y hora de ingreso", type: "datetime-local" },
  { key: "fechaEgreso", label: "Fecha y hora de egreso", type: "datetime-local" },
  { key: "supervisor", label: "Supervisor a cargo", placeholder: "Nombre y apellido" },
  { key: "legajo", label: "Legajo o CUIL", placeholder: "Ej. 12345" },
]

export function PlanillaHeaderForm({ header, onChange }: PlanillaHeaderFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {FIELDS.map((f) => (
        <div key={f.key} className="space-y-1.5">
          <Label htmlFor={`hdr-${f.key}`} className="text-xs font-medium text-muted-foreground">
            {f.label}
          </Label>
          <Input
            id={`hdr-${f.key}`}
            type={f.type ?? "text"}
            value={header[f.key]}
            placeholder={f.placeholder}
            onChange={(e) => onChange(f.key, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
