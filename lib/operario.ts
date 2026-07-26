import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const op: OficioId = "operario"

export const TAREAS_OPERARIO: ChecklistSection[] = [
  {
    id: "q1",
    order: "1",
    group: "SOBRE BASTIDOR",
    title: "CABINA CONDUCCIÓN y SALÓN DE PASAJEROS",
    subgroups: [{ code: "1-W", title: "ILUMINACIÓN SALÓN DE PASAJEROS", items: [{ code: "1-W", label: "Iluminación salón", detail: "Visual / Reemplazar tubos que no encienden.", oficio: op }] }],
  },
  {
    id: "q3",
    order: "3",
    group: "BAJO BASTIDOR",
    title: "COMPRESORES",
    subgroups: [{ code: "3-A", title: "COMPRESORES TC1 y TC2", items: [{ code: "3-A-11", label: "Limpieza", detail: "Limpieza de compresores.", oficio: op }] }],
  },
  {
    id: "q5",
    order: "5",
    group: "BAJO BASTIDOR",
    title: "BOGIES",
    subgroups: [{ code: "5-A", title: "COLECTOR DE CORRIENTE", items: [{ code: "5-A-4", label: "Limpieza", detail: "Limpieza en seco del conjunto colector de corriente.", oficio: op }] }],
  },
]