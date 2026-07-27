import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const ca: OficioId = "carpintero"

export const TAREAS_CARPINTERO: ChecklistSection[] = [
  {
    id: "q1",
    order: "1",
    group: "SOBRE BASTIDOR",
    title: "CABINA CONDUCCIÓN y SALÓN DE PASAJEROS",
    subgroups: [
      { code: "1-K", title: "PARABRISAS", items: [{ code: "1-K", label: "Parabrisas", detail: "Libre de rayas / rajaduras. Visual termostato.", oficio: ca }] },
      { code: "1-L", title: "PARASOL", items: [{ code: "1-L", label: "Parasol", detail: "Estado, limpieza y tornillería de fijación. Movimiento suave.", oficio: ca }] },
      {
        code: "1-M",
        title: "LIMPIA PARABRISAS",
        items: [
          { code: "1-M-1", label: "Funcionamiento", detail: "Funcionamiento mecánico y del aspersor (sapito).", oficio: ca },
          { code: "1-M-2", label: "Escobillas", detail: "Estado de escobillas y nivel de líquido (reponerlo si falta).", oficio: ca },
        ],
      },
      {
        code: "1-U",
        title: "FUELLE Y PASARELA DE INTERCOMUNICACIÓN",
        items: [
          { code: "1-U-1", label: "Fuelle", detail: "Integridad de la tela del fuelle, costuras, fisuras.", oficio: ca },
          { code: "1-U-2", label: "Pasarela", detail: "Integridad de pasarela, estado de las vinculaciones.", oficio: ca },
          { code: "1-U-3", label: "Colizas", detail: "Estado de colizas de desgaste.", oficio: ca },
          { code: "1-U-4", label: "Bisagras", detail: "Estado de bisagras y fijaciones. Libre movimiento.", oficio: ca },
        ],
      },
      { code: "1-X", title: "PISO", items: [{ code: "1-X", label: "Piso", detail: "Integridad y pegado de alfombra de goma.", oficio: ca }] },
      {
        code: "1-Y",
        title: "PUERTA DE CONDUCTOR",
        items: [
          { code: "1-Y-1", label: "Apertura/cierre", detail: "Suavidad de apertura y cerrado con llave pentagonal.", oficio: ca },
          { code: "1-Y-2", label: "Auto-retención", detail: "Funcional de auto-retención de amortiguación.", oficio: ca },
        ],
      },
      { code: "1-Z", title: "SALÓN", items: [{ code: "1-Z", label: "Salón", detail: "Estado general de asientos, pasamanos, interiorismo.", oficio: ca }] },
      {
        code: "1-AA",
        title: "PUERTAS LATERALES DE SALÓN",
        items: [
          { code: "1-AA-1", label: "Guía inferior", detail: "Limpieza de guía inferior y umbrales (importante, si no se traba).", oficio: ca },
          { code: "1-AA-2", label: "Hojas/vidrio", detail: "Integridad de las hojas, estado del vidrio.", oficio: ca },
          { code: "1-AA-3", label: "Apertura/cierre", detail: "Suavidad en la apertura/cierre. Fijaciones.", oficio: ca },
          { code: "1-AA-4", label: "Finales carrera", detail: "Integridad de finales de carrera y sus fijaciones.", oficio: ca },
          { code: "1-AA-5", label: "Motor/topes", detail: "Montaje de motor y topes de amortiguación.", oficio: ca },
          { code: "1-AA-7", label: "Cubierta superior", detail: "Cubierta superior de puerta, cerradura, bisagras.", oficio: ca },
        ],
      },
    ],
  },
  {
    id: "q2",
    order: "2",
    group: "SOBRE BASTIDOR",
    title: "CARROCERÍA",
    subgroups: [
      { code: "2-A", title: "ESTADO DE LA PINTURA", items: [{ code: "2-A", label: "Pintura", detail: "Integridad general.", oficio: ca }] },
      { code: "2-B", title: "CALCOS REFLECTIVOS", items: [{ code: "2-B", label: "Calcos reflectivos", detail: "Integridad general.", oficio: ca }] },
      { code: "2-D", title: "VENTANAS LATERALES", items: [{ code: "2-D", label: "Ventanas laterales", detail: "Integridad, estanqueidad.", oficio: ca }] },
      { code: "2-F", title: "FUELLE EXTERNO", items: [{ code: "2-F-ca", label: "Fuelle externo (Carpintero)", detail: "Integridad de tela y costura.", oficio: ca }] },
    ],
  },
]
