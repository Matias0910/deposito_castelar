import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const el: OficioId = "electrico"

export const TAREAS_ELECTRICOS: ChecklistSection[] = [
  {
    id: "q1",
    order: "1",
    group: "SOBRE BASTIDOR",
    title: "CABINA CONDUCCIÓN y SALÓN DE PASAJEROS",
    subgroups: [
      {
        code: "1-C",
        title: "LUCES EXTERIORES",
        items: [{ code: "1-C", label: "Luces exteriores", detail: "Encendido de luces rojas, bajas y altas.", oficio: el }],
      },
      {
        code: "1-T",
        title: "UNIDAD DE CONTROL MICROCOMPUTADORA DE FRENO",
        items: [{ code: "1-T", label: "Microcomputadora de freno", detail: "Estado general, fijaciones, conexiones, puesta a tierra.", oficio: el }],
      },
    ],
  },
  {
    id: "q2",
    order: "2",
    group: "SOBRE BASTIDOR",
    title: "CARROCERÍA",
    subgroups: [
      {
        code: "2-G",
        title: "Cables entre coches",
        items: [{ code: "2-G", label: "Cables entre coches", detail: "Integridad de cables de potencia y sincronismo.", oficio: el }],
      },
    ],
  },
  {
    id: "q5",
    order: "5",
    group: "BAJO BASTIDOR",
    title: "BOGIES",
    subgroups: [
      {
        code: "5-A",
        title: "COLECTOR DE CORRIENTE",
        items: [
          { code: "5-A-8", label: "Testigo fusible", detail: "Revisar testigo de fusible. Cambiar quemados.", oficio: el },
          { code: "5-A-9", label: "Cableado", detail: "Cableado de colector de corriente.", oficio: el },
        ],
      },
      {
        code: "5-E",
        title: "CAJA DE PUNTA DE EJE y TAPA",
        items: [{ code: "5-E-5", label: "Cables", detail: "Estado de los cables y conexiones de patillas de ejes.", oficio: el }],
      },
      {
        code: "5-F",
        title: "SENSORES DE PUNTA DE EJE",
        items: [{ code: "5-F", label: "Sensores", detail: "Inspeccionar / Verificar (Estado y cableado).", oficio: el }],
      },
      {
        code: "5-Q",
        title: "MOTOR DE TRACCIÓN",
        items: [
          { code: "5-Q", label: "Motor de tracción", detail: "Inspeccionar / Verificar", oficio: el },
          { code: "5-Q-1", label: "Carcasa", detail: "Verificar el estado y el aspecto de la carcasa.", oficio: el },
          { code: "5-Q-2", label: "Vinculaciones", detail: "Visual de las vinculaciones, alambres de seguridad.", oficio: el },
          { code: "5-Q-3", label: "Pérdidas", detail: "Pérdidas de lubricante.", oficio: el },
          { code: "5-Q-4", label: "Ventilación", detail: "Objetos extraños en rejillas de ventilación, limpiarlos.", oficio: el },
        ],
      },
      {
        code: "5-W",
        title: "ANTENA ATSD",
        items: [
          { code: "5-W", label: "Antena ATSD", detail: "Inspeccionar / Verificar", oficio: el },
          { code: "5-W-1", label: "Fijación", detail: "Fijación y estado de antena ATSD con el coche.", oficio: el },
          { code: "5-W-2", label: "Cableado", detail: "Estado general del cable ATSD (golpes, rayaduras).", oficio: el },
          { code: "5-W-3", label: "Distancia", detail: "Distancia entre la antena BTM y la superficie del riel entre 275-285mm.", oficio: el },
        ],
      },
      {
        code: "5-X",
        title: "ANTENA ATS",
        items: [
          { code: "5-X", label: "Antena ATS", detail: "Inspeccionar / Verificar", oficio: el },
          { code: "5-X-1", label: "Fijación", detail: "Fijación y estado de antena ATS con el coche.", oficio: el },
          { code: "5-X-2", label: "Tacos generadores", detail: "Estado y fijación de los tacos generadores.", oficio: el },
        ],
      },
    ],
  },
  {
    id: "q6",
    order: "6",
    group: "BAJO BASTIDOR",
    title: "CAJA DE EQUIPAMIENTOS",
    subgroups: [
      {
        code: "6-A",
        title: "ARRANQUE DEL COMPRESOR",
        items: [{ code: "6-A-1", label: "Gabinete", detail: "Estado del gabinete, cerraduras, hermeticidad, elementos del sistema de arranque del compresor.", oficio: el }],
      },
      {
        code: "6-B",
        title: "INVERSOR AUXILIAR SIV",
        items: [
          { code: "6-B-1", label: "Gabinete", detail: "Estado del gabinete, cerraduras, hermeticidad.", oficio: el },
          { code: "6-B-2", label: "Vinculaciones", detail: "Vinculaciones, puesta a tierra.", oficio: el },
        ],
      },
      {
        code: "6-C",
        title: "VVVF CAJA DE INVERSOR",
        items: [
          { code: "6-C-1", label: "Gabinete", detail: "Estado del gabinete, cerraduras, hermeticidad.", oficio: el },
          { code: "6-C-2", label: "Vinculaciones", detail: "Vinculaciones, puesta a tierra.", oficio: el },
        ],
      },
    ],
  },
  {
    id: "q7",
    order: "7",
    group: "BAJO BASTIDOR",
    title: "INSTALACIONES",
    subgroups: [
      { code: "7-B", title: "ELÉCTRICA", items: [{ code: "7-B-1", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: el }, { code: "7-B-2", label: "Terminales", detail: "Conexiones de terminales.", oficio: el }, { code: "7-B-3", label: "Cableado", detail: "Integridad general del cableado.", oficio: el }, { code: "7-B-4", label: "Mangas", detail: "Mangas entre coches.", oficio: el }, { code: "7-B-5", label: "Gabinetes", detail: "Estado de gabinetes.", oficio: el }] },
      { code: "7-C", title: "UNIDAD DE CONTROL DE FRENO", items: [{ code: "7-C-1", label: "Gabinete", detail: "Estado del gabinete, vinculaciones, puesta a tierra.", oficio: el }, { code: "7-C-2", label: "Conexiones", detail: "Aspecto de las conexiones y de los componentes.", oficio: el }] },
      { code: "7-D", title: "UNIDAD AUXILIAR DE FRENO", items: [{ code: "7-D-1", label: "Gabinete", detail: "Estado del gabinete, vinculaciones, puesta a tierra.", oficio: el }, { code: "7-D-2", label: "Conexiones", detail: "Aspecto de las conexiones y de los componentes.", oficio: el }] },
    ],
  },
]
