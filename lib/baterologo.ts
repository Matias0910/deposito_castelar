import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const ba: OficioId = "baterologo"

export const TAREAS_BATEROLOGO: ChecklistSection[] = [
  {
    id: "q4",
    order: "4",
    group: "BAJO BASTIDOR",
    title: "CAJÓN DE BATERÍAS",
    subgroups: [
      {
        code: "4-A",
        title: "ACUMULADORES",
        items: [
          { code: "4-A-1", label: "Limpieza", detail: "Limpieza interior y exterior de armario con aire comprimido de 2 a 3 kg/cm².", oficio: ba },
          { code: "4-A-7", label: "Tensión flotante", detail: "Controlar valor de tensión flotante en cajones de baterías de TC1 y TC2. 105V < Tensión < 125V.", oficio: ba, tensionFlotante: true },
        ],
      },
    ],
  },
]