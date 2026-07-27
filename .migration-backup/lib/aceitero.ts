import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const ac: OficioId = "aceitero"

export const TAREAS_ACEITERO: ChecklistSection[] = [
  {
    id: "q3",
    order: "3",
    group: "BAJO BASTIDOR",
    title: "COMPRESORES",
    subgroups: [
      {
        code: "3-A",
        title: "COMPRESORES TC1 y TC2",
        items: [
          { code: "3-A-0-ODO", label: "Odómetros", detail: "Registrar horas de funcionamiento de los compresores TC1 y TC2.", oficio: ac, odometro: true },
          { code: "3-A-0-NRO", label: "N° de compresores", detail: "Registrar número de serie de los compresores TC1 y TC2.", oficio: ac, nroCompresor: true },
          { code: "3-A-1", label: "Nivel de aceite", detail: "Revisar nivel de aceite según Dok Nº 8-LC20.54 REv 07-es, si es necesario agregar.", oficio: ac },
          { code: "3-A-2", label: "Sonido", detail: "Inspeccionar en funcionamiento el sonido normal sin ruidos extraños ni pérdidas de aire / aceite.", oficio: ac },
          { code: "3-A-3", label: "Purgar separador", detail: "Purgar el separador de aceite hasta salir aire limpio.", oficio: ac },
          { code: "3-A-4", label: "Aspecto general", detail: "Aspecto general, sin golpes ni daños.", oficio: ac },
          { code: "3-A-5", label: "Fijaciones", detail: "Estado de fijaciones, silent-block de apoyo.", oficio: ac },
          { code: "3-A-6", label: "Cables/tierra", detail: "Estado de cables, puestas a tierra y flexible de salida.", oficio: ac },
          { code: "3-A-7", label: "Precintar válvula", detail: "Precintar válvula de seguridad.", oficio: ac },
          { code: "3-A-8", label: "Fijaciones/daños", detail: "Fijaciones, signos de sobrecalentamientos, daños.", oficio: ac },
          { code: "3-A-9", label: "Filtro de aire", detail: "Control de indicador de vacío en filtro de aire.", oficio: ac },
          { code: "3-A-10", label: "Llenado formación", detail: "Encender un compresor y verificar el llenado de la formación en menos de 30 minutos.", oficio: ac },
        ],
      },
    ],
  },
]
