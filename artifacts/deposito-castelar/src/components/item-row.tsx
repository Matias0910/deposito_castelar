import { Check, X } from "lucide-react"
import { OFICIOS_MAP } from "@/lib/oficios"
import type { ChecklistItem } from "@/lib/planillas"
import type { Estado, ItemEntry } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { TensionFlotante } from "./TensionFlotante"
import { AnexoMecanico } from "./AnexoMecanico"
import { AnexoBaterias } from "./AnexoBaterias"

interface ItemRowProps {
  item: ChecklistItem
  entry: ItemEntry
  showOficio: boolean
  onEstado: (code: string, estado: Estado) => void
  onField: (code: string, field: keyof ItemEntry, value: string) => void
}

export function ItemRow({ item, entry, showOficio, onEstado, onField }: ItemRowProps) {
  const oficio = OFICIOS_MAP[item.oficio]
  const OficioIcon = oficio.icon

  const isDataOnly = item.odometro || item.nroCompresor || item.tensionFlotante || item.anexoMecanico || item.anexoBaterias

  return (
    <div className="border-t border-border px-3 py-3 first:border-t-0 sm:px-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs font-semibold text-secondary-foreground">
              {item.code}
            </span>
            <span className="text-sm font-medium text-foreground">{item.label}</span>
            {showOficio && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                <OficioIcon className="size-3" aria-hidden="true" />
                {oficio.short}
              </span>
            )}
          </div>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>

          {item.precinto && (
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:max-w-md">
              <Input
                aria-label={`${item.code} número precinto TC1`}
                placeholder="N° Precinto TC1"
                value={entry.precintoTC1 ?? ""}
                onChange={(e) => onField(item.code, "precintoTC1", e.target.value)}
              />
              <Input
                aria-label={`${item.code} número precinto TC2`}
                placeholder="N° Precinto TC2"
                value={entry.precintoTC2 ?? ""}
                onChange={(e) => onField(item.code, "precintoTC2", e.target.value)}
              />
            </div>
          )}

          {item.odometro && (
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:max-w-md">
              <Input
                aria-label={`${item.code} odómetro TC1`}
                placeholder="Horas TC1"
                value={entry.odometroTC1 ?? ""}
                onChange={(e) => onField(item.code, "odometroTC1", e.target.value)}
              />
              <Input
                aria-label={`${item.code} odómetro TC2`}
                placeholder="Horas TC2"
                value={entry.odometroTC2 ?? ""}
                onChange={(e) => onField(item.code, "odometroTC2", e.target.value)}
              />
            </div>
          )}

          {item.nroCompresor && (
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:max-w-md">
              <Input
                aria-label={`${item.code} N° compresor TC1`}
                placeholder="N° Serie Compresor TC1"
                value={entry.nroCompresorTC1 ?? ""}
                onChange={(e) => onField(item.code, "nroCompresorTC1", e.target.value)}
              />
              <Input
                aria-label={`${item.code} N° compresor TC2`}
                placeholder="N° Serie Compresor TC2"
                value={entry.nroCompresorTC2 ?? ""}
                onChange={(e) => onField(item.code, "nroCompresorTC2", e.target.value)}
              />
            </div>
          )}

          {item.tensionFlotante && <TensionFlotante code={item.code} entry={entry} setField={onField} />}
          {item.anexoMecanico && <AnexoMecanico code={item.code} entry={entry} setField={onField} />}
          {item.anexoBaterias && <AnexoBaterias code={item.code} entry={entry} setField={onField} />}
        </div>

        {!isDataOnly && (
          <div className="flex shrink-0 items-start gap-2">
            <div className="flex gap-1.5" role="group" aria-label={`Estado ${item.code}`}>
              <button
                type="button"
                onClick={() => onEstado(item.code, "si")}
                aria-pressed={entry.estado === "si"}
                className={cn(
                  "inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-semibold transition-colors",
                  entry.estado === "si"
                    ? "border-[var(--success)] bg-[var(--success)] text-white"
                    : "border-border bg-card text-muted-foreground hover:border-green-500/50 hover:text-foreground",
                )}
              >
                <Check className="size-4" aria-hidden="true" />
                SÍ
              </button>
              <button
                type="button"
                onClick={() => onEstado(item.code, "no")}
                aria-pressed={entry.estado === "no"}
                className={cn(
                  "inline-flex h-9 items-center gap-1 rounded-md border px-3 text-sm font-semibold transition-colors",
                  entry.estado === "no"
                    ? "border-destructive bg-destructive text-white"
                    : "border-border bg-card text-muted-foreground hover:border-destructive/50 hover:text-foreground",
                )}
              >
                <X className="size-4" aria-hidden="true" />
                NO
              </button>
            </div>
          </div>
        )}
      </div>

      {!isDataOnly && (
        <Input
          aria-label={`Observaciones ${item.code}`}
          placeholder="Observaciones…"
          value={entry.obs}
          onChange={(e) => onField(item.code, "obs", e.target.value)}
          className="mt-3 bg-background"
        />
      )}
    </div>
  )
}
