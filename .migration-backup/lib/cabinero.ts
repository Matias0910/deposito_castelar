import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const cb: OficioId = "cabinero"

export const TAREAS_CABINERO: ChecklistSection[] = [
  {
    id: "q1",
    order: "1",
    group: "SOBRE BASTIDOR",
    title: "CABINA CONDUCCIÓN y SALÓN DE PASAJEROS",
    subgroups: [
      {
        code: "1-A",
        title: "ENCENDIDO",
        items: [{ code: "1-A", label: "Encendido", detail: "Encendido con baterías.", oficio: cb }],
      },
      {
        code: "1-D",
        title: "ILUMINACIÓN DE CABINA",
        items: [{ code: "1-D", label: "Iluminación de cabina", detail: "Visual / Reemplazar lámparas que no encienden.", oficio: cb }],
      },
      { code: "1-E", title: "RADIO", items: [{ code: "1-E", label: "Radio", detail: "Funcionamiento correcto.", oficio: cb }] },
      { code: "1-F", title: "GABINETES ELÉCTRICOS", items: [{ code: "1-F", label: "Gabinetes eléctricos", detail: "Estado general de contactores.", oficio: cb }] },
      { code: "1-G", title: "CÁMARAS", items: [{ code: "1-G", label: "Cámaras", detail: "Correcto funcionamiento en toda la formación.", oficio: cb }] },
      { code: "1-H", title: "SISTEMA PIDS", items: [{ code: "1-H", label: "Sistema PIDS", detail: "Sistema de audio, verificar megáfono.", oficio: cb }] },
      { code: "1-I", title: "AIRE ACONDICIONADO", items: [{ code: "1-I", label: "Aire acondicionado", detail: "Correcto funcionamiento del sistema.", oficio: cb }] },
      {
        code: "1-N",
        title: "BOCINA",
        items: [
          { code: "1-N-1", label: "Prueba sonora", detail: "Prueba sonora por pedal y pulsador de tablero.", oficio: cb },
          { code: "1-N-2", label: "Limpieza pedal", detail: "Limpieza de pedal por aspirado.", oficio: cb },
        ],
      },
      {
        code: "1-O",
        title: "PEDAL HOMBRE MUERTO",
        items: [
          { code: "1-O-1", label: "Limpieza pedal", detail: "Limpieza de pedal por aspirado.", oficio: cb },
          { code: "1-O-2", label: "Pantalla I/O", detail: "Comprobar funcionamiento en pantalla I/O.", oficio: cb },
        ],
      },
      { code: "1-P", title: "ATSD", items: [{ code: "1-P", label: "ATSD", detail: "Verificar encendido y funcionamiento del sistema.", oficio: cb, precinto: true }] },
      { code: "1-Q", title: "ATS", items: [{ code: "1-S", label: "ATS", detail: "Verificar encendido y funcionamiento del sistema.", oficio: cb, precinto: true }] },
      { code: "1-Q-1", title: "SKEMP", items: [{ code: "1-Q-1", label: "Precintos SKEMP", detail: "Verificar precinto.", oficio: cb, precinto: true }] },
      { code: "1-R", title: "HVAC", items: [{ code: "1-R", label: "HVAC", detail: "Verificar funcionamiento en control centralizado en todos los coches.", oficio: cb }] },
    ],
  },
  { id: "q2", order: "2", group: "SOBRE BASTIDOR", title: "CARROCERÍA", subgroups: [{ code: "2-C", title: "LUCES LATERALES", items: [{ code: "2-C", label: "Luces laterales", detail: "Funcionamiento.", oficio: cb }] }] },
]
