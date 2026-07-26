import { Users } from "lucide-react"
import { OFICIOS, type OficioId } from "@/lib/oficios"
import { cn } from "@/lib/utils"

interface OficioFilterProps {
  value: OficioId | "todos"
  onChange: (value: OficioId | "todos") => void
  counts: Record<string, number>
}

export function OficioFilter({ value, onChange, counts }: OficioFilterProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Users className="size-4 text-primary" aria-hidden="true" />
        <span>Oficio</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange("todos")}
          aria-pressed={value === "todos"}
          className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
            value === "todos"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-foreground hover:bg-accent",
          )}
        >
          Todos
          <span
            className={cn(
              "rounded-full px-1.5 text-xs",
              value === "todos" ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground",
            )}
          >
            {counts.todos ?? 0}
          </span>
        </button>
        {OFICIOS.map((o) => {
          const Icon = o.icon
          const active = value === o.id
          const count = counts[o.id] ?? 0
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              disabled={count === 0}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                active
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-foreground hover:bg-accent",
                count === 0 && "cursor-not-allowed opacity-40 hover:bg-card",
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {o.short}
              <span
                className={cn(
                  "rounded-full px-1.5 text-xs",
                  active ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground",
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
