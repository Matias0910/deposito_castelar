import { ChevronsUpDown, TrainFront } from "lucide-react"
import { cn } from "@/lib/utils"

interface EquipoSelectorProps {
  total: number
  value: number
  onChange: (value: number) => void
  completeness: (equipoId: number) => number
}

export function EquipoSelector({ total, value, onChange }: EquipoSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <TrainFront className="size-4 text-primary" aria-hidden="true" />
        <span>Equipo / Formación</span>
      </div>
      <div className="relative w-full max-w-xs">
        <select
          id="equipo-selector"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "w-full appearance-none rounded-lg border border-border bg-card py-2 pl-3 pr-10 text-base font-semibold transition-colors hover:border-primary/50",
            "focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50",
          )}
        >
          {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              Equipo {n}
            </option>
          ))}
        </select>
        <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  )
}
