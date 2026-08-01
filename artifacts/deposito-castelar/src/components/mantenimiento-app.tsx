import { useMemo, useState } from "react";
import { CalendarClock, CalendarRange, CheckCircle2, Printer, RotateCcw, Save, History, Wrench, Bot, Search, Eye } from "lucide-react";
import type { PlanillaRecord } from "@/lib/store";
import { OFICIOS, type OficioId } from "@/lib/oficios";
import { getAllItems, PLANILLAS, type PlanillaTipo } from "@/lib/planillas";
import { useMantenimiento } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EquipoSelector } from "./equipo-selector";
import { OficioFilter } from "./oficio-filter";
import { PlanillaHeaderForm } from "./planilla-header-form";
import { SectionBlock } from "./section-block";
import { PlanillaAnexoObservaciones } from "./planilla-anexo-observaciones";
import { HistorialPlanillas } from './HistorialPlanillas';
import { BuscadorArchivosFallas } from './BuscadorFallas';
import { AsistenteIA } from './AsistenteIA';

const TOTAL_EQUIPOS = 25
type Vista = "planillas" | "buscador" | "asistente" | "historial";

interface MantenimientoAppProps {
  initialOficio: OficioId | "todos";
  lockOficio: boolean;
}

export function MantenimientoApp({ initialOficio, lockOficio }: MantenimientoAppProps) {
  const [equipo, setEquipo] = useState(1)
  const [tipo, setTipo] = useState<PlanillaTipo>("quincenal")
  const [oficio, setOficio] = useState<OficioId | "todos">(initialOficio)
  const [vista, setVista] = useState<Vista>("planillas");

  const planilla = PLANILLAS[tipo]
  const { record, loaded, setEstado, setField, setHeader, setObservacion, reset, guardarEnHistorial, cargarRegistroDesdeHistorial } = useMantenimiento(equipo, tipo);

  const allItems = useMemo(() => getAllItems(planilla), [planilla])

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: allItems.length }
    for (const o of OFICIOS) c[o.id] = 0
    for (const it of allItems) c[it.oficio] = (c[it.oficio] ?? 0) + 1
    return c
  }, [allItems])

  const isVisible = (item: { oficio: OficioId }) => oficio === "todos" || item.oficio === oficio

  const visibleItems = allItems.filter((i) => isVisible(i))
  const doneVisible = visibleItems.filter((i) => (record.entries[i.code]?.estado ?? "") !== "").length
  const pct = visibleItems.length ? Math.round((doneVisible / visibleItems.length) * 100) : 0

  const loadCompleteness = (equipoId: number, tipoCurrent: PlanillaTipo) => {
    if (typeof window === "undefined") return 0;
    try {
      const raw = window.localStorage.getItem(`cartillas:v1:${equipoId}:${tipoCurrent}`);
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      const entries = parsed.entries ?? {};
      const done = allItems.filter((i) => (entries[i.code]?.estado ?? "") !== "").length;
      return allItems.length ? Math.round((done / allItems.length) * 100) : 0;
    } catch {
      return 0;
    }
  };

  const handleGuardarPlanilla = async () => {
    if (!window.confirm(`¿Confirmas que deseas guardar la planilla para el Equipo ${equipo}?`)) {
      return;
    }

    try {
      // Llamamos a la función guardarEnHistorial del hook, que ya tiene la lógica correcta
      // para incluir el equipo y el tipo de planilla.
      await guardarEnHistorial();

      alert(`Planilla para el Equipo ${equipo} guardada con éxito.`);
    } catch (error) {
      console.error('Error al guardar la planilla:', error); // El error ya incluye el mensaje del backend
      alert(`Hubo un error al intentar guardar la planilla: ${(error as Error).message}. Revisa la consola para más detalles.`);
    }
  };

  const NavButton = ({ id, label, icon: Icon }: { id: Vista, label: string, icon: React.ElementType }) => {
    const active = vista === id;
    return (
      <button
        onClick={() => setVista(id)}
        className={cn(
          "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon className="size-4" />
        {label}
      </button>
    );
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:py-8">
      <header className="mb-6 print:hidden">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">Trenes Argentinos · Operaciones</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance sm:text-3xl">Depósito Castelar</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Coche Eléctrico RC — CSR Mitsubishi · Planillas por oficio para 25 equipos
            </p>
          </div>
        </div>
      </header>
      
      <nav className="flex gap-2 border-b border-border pb-4 mb-6">
        <NavButton id="planillas" label="Planillas" icon={Wrench} />
        <NavButton id="buscador" label="Buscador Fallas" icon={Search} />
        <NavButton id="historial" label="Historial" icon={History} />
        <NavButton id="asistente" label="Asistente IA" icon={Bot} />
      </nav>

      {vista === "planillas" && (
        <>
          {/* Controls */}
          <div className="space-y-5 rounded-2xl border border-border bg-card p-4 print:hidden sm:p-5">
            <EquipoSelector total={TOTAL_EQUIPOS} value={equipo} onChange={setEquipo} completeness={(id) => loadCompleteness(id, tipo)} />

            <div className="h-px bg-border" />

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <CalendarClock className="size-4 text-primary" aria-hidden="true" />
                <span>Tipo de planilla</span>
              </div>
              <div className="inline-flex rounded-lg border border-border bg-muted/50 p-1">
                {(
                  [
                    { id: "quincenal" as const, label: "Quincenal", icon: CalendarClock },
                    { id: "bimestral" as const, label: "Bimestral", icon: CalendarRange },
                  ]
                ).map((t) => {
                  const Icon = t.icon
                  const active = tipo === t.id
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTipo(t.id)}
                      aria-pressed={active}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                        active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {t.label}
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="h-px bg-border" />

            <OficioFilter 
              value={oficio} 
              onChange={setOficio} 
              counts={counts} 
              disabled={lockOficio}
            />
          </div>

          {/* Progress bar */}
          <div className="sticky top-0 z-10 mt-6 rounded-xl border border-border bg-card/95 p-4 backdrop-blur print:!static print:border-none print:bg-transparent print:p-0 print:shadow-none">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle2 className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Equipo {equipo} · {planilla.nombre}
                    {oficio !== "todos" && ` · ${OFICIOS.find((o) => o.id === oficio)?.short}`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doneVisible} de {visibleItems.length} ítems completados
                    {record.updatedAt && ` · Guardado ${new Date(record.updatedAt).toLocaleString("es-AR")}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 print:hidden">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-28 overflow-hidden rounded-full bg-muted sm:w-40">
                    <div
                      className={cn("h-full rounded-full transition-all", pct === 100 ? "bg-green-500" : "bg-primary")}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-foreground">{pct}%</span>
                </div>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  <Printer className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Ver PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`¿Borrar los datos cargados del Equipo ${equipo} (${planilla.nombre})?`)) reset()
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive print:hidden"
                >
                  <RotateCcw className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Reiniciar</span>
                </button>
                {/* Botón para Guardar la planilla en el historial */}
                <button
                  type="button"
                  onClick={handleGuardarPlanilla}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  <Save className="size-4" aria-hidden="true" />
                  <span className="hidden sm:inline">Guardar Planilla</span>
                </button>
              </div>
            </div>
          </div>

          <Tabs defaultValue="cartilla" className="mt-4">
            <TabsList className="grid w-full grid-cols-2 sm:w-[400px]">
              <TabsTrigger value="cartilla">Cartilla de Mantenimiento</TabsTrigger>
              <TabsTrigger value="observaciones">Observaciones Generales</TabsTrigger>
            </TabsList>
            <TabsContent value="cartilla">
              {/* Header form */}
              <div className="mt-6 rounded-2xl border border-border bg-card p-4 sm:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Save className="size-4 text-primary" aria-hidden="true" />
                  <h2 className="text-sm font-semibold text-foreground">Datos de la cartilla</h2>
                  <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                    {planilla.codigo} · v{planilla.version}
                  </span>
                </div>
                <PlanillaHeaderForm header={record.header} onChange={setHeader} />
              </div>

              {/* Sections */}
              <div className="mt-6 space-y-4">
                {!loaded ? (
                  <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
                    Cargando…
                  </div>
                ) : (
                  planilla.sections.map((section) => {
                    const sectionItems = section.subgroups.flatMap((sg) => sg.items).filter((i) => isVisible(i))
                    if (sectionItems.length === 0) return null
                    return (
                      <SectionBlock
                        key={section.id}
                        section={section}
                        visibleItems={sectionItems}
                        record={record}
                        showOficio={oficio === "todos"}
                        onEstado={setEstado}
                        onField={setField}
                      />
                    )
                  })
                )}
              </div>
            </TabsContent>
            <TabsContent value="observaciones">
              <PlanillaAnexoObservaciones
                header={record.header}
                filas={record.observaciones.filas}
                onFilaChange={setObservacion}
              />
            </TabsContent>
          </Tabs>

          <footer className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground print:hidden">
            Los datos se guardan automáticamente en este dispositivo.
          </footer>
        </>
      )}

      {vista === "buscador" && <BuscadorArchivosFallas />}
      {vista === "historial" && <HistorialPlanillas />}
      {vista === "asistente" && <AsistenteIA />}

    </div>
  )
}
