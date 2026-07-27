import type { ChecklistItem, ChecklistSection } from "@/lib/planillas"
import type { Estado, ItemEntry, PlanillaRecord } from "@/lib/store"
import { ItemRow } from "./item-row"

interface SectionBlockProps {
  section: ChecklistSection
  visibleItems: ChecklistItem[]
  record: PlanillaRecord
  showOficio: boolean
  onEstado: (code: string, estado: Estado) => void
  onField: (code: string, field: keyof ItemEntry, value: string) => void
}

const emptyEntry: ItemEntry = { estado: "", obs: "" }

export function SectionBlock({ section, visibleItems, record, showOficio, onEstado, onField }: SectionBlockProps) {
  const visibleCodes = new Set(visibleItems.map((i) => i.code))
  const done = visibleItems.filter((i) => (record.entries[i.code]?.estado ?? "") !== "").length

  return (
    <section className="overflow-hidden rounded-xl border border-border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-2 bg-primary px-4 py-3 text-primary-foreground">
        <div className="flex items-center gap-3">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground/15 font-mono text-sm font-bold">
            {section.order}
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-wide text-primary-foreground/70">{section.group}</p>
            <h3 className="text-sm font-semibold leading-tight text-balance">{section.title}</h3>
          </div>
        </div>
        <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-xs font-medium tabular-nums">
          {done}/{visibleItems.length}
        </span>
      </header>

      <div>
        {section.subgroups.map((sg) => {
          const items = sg.items.filter((i) => visibleCodes.has(i.code))
          if (items.length === 0) return null
          const isSingle = items.length === 1 && items[0].code === sg.code
          return (
            <div key={sg.code} className="border-t border-border first:border-t-0">
              {!isSingle && (
                <div className="bg-muted/60 px-3 py-1.5 sm:px-4">
                  <span className="font-mono text-xs font-semibold text-muted-foreground">{sg.code}</span>
                  <span className="ml-2 text-xs font-medium text-foreground">{sg.title}</span>
                </div>
              )}
              {items.map((item) => (
                <ItemRow
                  key={item.code}
                  item={item}
                  entry={record.entries[item.code] ?? emptyEntry}
                  showOficio={showOficio}
                  onEstado={onEstado}
                  onField={onField}
                />
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
