import type { OficioId } from "./oficios"
import { TAREAS_ACEITERO } from "./aceitero"
import { TAREAS_BATEROLOGO } from "./baterologo"
import { TAREAS_CABINERO } from "./cabinero"
import { TAREAS_CARPINTERO } from "./carpintero"
import { TAREAS_ELECTRICOS } from "./electrico"
import { TAREAS_MECANICO } from "./mecanico"
import { TAREAS_OPERARIO } from "./operario"

export type PlanillaTipo = "quincenal" | "bimestral"

export interface ChecklistItem {
  code: string
  label: string
  detail: string
  oficio: OficioId
  /** Campos especiales que se piden en la cartilla (ej. números de precinto) */
  precinto?: boolean
  /** Registrar horas de odómetro del compresor TC1 y TC2 */
  odometro?: boolean
  /** Registrar número de serie del compresor TC1 y TC2 */
  nroCompresor?: boolean
  /** Registrar tensión flotante del TC1 y TC2 */
  tensionFlotante?: boolean
  /** Anexo 2 de Mecánica */
  anexoMecanico?: boolean
  /** Anexo 3 de Baterías */
  anexoBaterias?: boolean
}

export interface ChecklistSubgroup {
  code: string
  title: string
  items: ChecklistItem[]
}

export interface ChecklistSection {
  id: string
  order: string
  group: string
  title: string
  subgroups: ChecklistSubgroup[]
}

export interface Planilla {
  tipo: PlanillaTipo
  nombre: string
  codigo: string
  version: string
  vigencia: string
  sections: ChecklistSection[]
}

const el: OficioId = "electrico"
const me: OficioId = "mecanico"
const ca: OficioId = "carpintero"
const cb: OficioId = "cabinero"
const ac: OficioId = "aceitero"
const ba: OficioId = "baterologo"
const op: OficioId = "operario"

// ---------------------------------------------------------------------------
// PLANILLA QUINCENAL (CM-CCEE-CSR 440 LM-LS-1676-QI-NU-V1.2-LS)
// ---------------------------------------------------------------------------
const TAREAS_BASE = [
  ...TAREAS_ACEITERO,
  ...TAREAS_BATEROLOGO,
  ...TAREAS_CABINERO,
  ...TAREAS_CARPINTERO,
  ...TAREAS_MECANICO,
  ...TAREAS_OPERARIO,
]

function mergePlanillas(base: ChecklistSection[], toAdd: ChecklistSection[]): ChecklistSection[] {
  const allSections = JSON.parse(JSON.stringify([...base, ...toAdd]));
  const sectionsById = new Map<string, ChecklistSection>();

  allSections.forEach(currentSection => {
    let section = sectionsById.get(currentSection.id);
    if (!section) {
      // Si la sección no existe, la creamos a partir de la actual
      section = JSON.parse(JSON.stringify(currentSection));
      sectionsById.set(currentSection.id, section);
    } else {
      // Si la sección ya existe, fusionamos los subgrupos
      currentSection.subgroups.forEach(subgroupToAdd => {
        const existingSubgroup = section!.subgroups.find(sg => sg.code === subgroupToAdd.code);
        if (existingSubgroup) {
          // Si el subgrupo ya existe, fusionamos los ítems para evitar duplicados
          existingSubgroup.items.push(...subgroupToAdd.items);
          existingSubgroup.items.sort((a, b) => a.code.localeCompare(b.code));
        } else {
          // Si no existe, lo añadimos (asegurándonos de no añadirlo dos veces)
          if (!section!.subgroups.some(sg => sg.code === subgroupToAdd.code)) {
            section!.subgroups.push(subgroupToAdd);
          }
        }
      });
    }
  });

  const result = Array.from(sectionsById.values());
  return result.sort((a, b) => parseInt(a.order, 10) - parseInt(b.order, 10));
}

export const PLANILLA_QUINCENAL: Planilla = {
  tipo: "quincenal",
  nombre: "Mantenimiento Quincenal",
  codigo: "CM-CCEE-CSR 440 LM-LS-1676-QI-NU-V1.2-LS",
  version: "1.2",
  vigencia: "30/05/2025",
  sections: mergePlanillas(TAREAS_BASE, TAREAS_ELECTRICOS),
};

// ---------------------------------------------------------------------------
// PLANILLA BIMESTRAL (CM-CCEE-CSR 440 LM-LS-1676-BI-NU-V7.1-LS)
// ---------------------------------------------------------------------------
export const PLANILLA_BIMESTRAL: Planilla = {
  tipo: "bimestral",
  nombre: "Mantenimiento Bimestral",
  codigo: "CM-CCEE-CSR 440 LM-LS-1676-BI-NU-V7.1-LS",
  version: "7.1",
  vigencia: "30/05/2025",
  sections: (() => {
    // 1. Partimos de una copia de la planilla quincenal para no perder nada.
    const bimestralSections = JSON.parse(JSON.stringify(PLANILLA_QUINCENAL.sections)) as ChecklistSection[];

    // 2. Aplicamos las modificaciones específicas de la planilla bimestral.
    const seccionCajonBaterias = bimestralSections.find(s => s.id === 'q4');
    if (seccionCajonBaterias) {
      const acumuladoresSubgroup = seccionCajonBaterias.subgroups.find(sg => sg.code === '4-A');
      if (acumuladoresSubgroup) {
        // Modificamos el detalle del item de limpieza que es específico de la bimestral
        const limpiezaItem = acumuladoresSubgroup.items.find(item => item.code === '4-A-1');
        if (limpiezaItem) {
          limpiezaItem.detail = "Limpieza interior y exterior de armario con aire comprimido de 2 a 3 kg/cm².";
        }

        // Agregamos las tareas específicas de la bimestral que faltaban
        acumuladoresSubgroup.items.push(
          { code: "4-A-2", label: "Estanqueidad", detail: "Estanqueidad y estado de las cerraduras.", oficio: ba },
          { code: "4-A-3", label: "Apariencia", detail: "Apariencia, fijaciones, cableado.", oficio: ba },
          { code: "4-A-4", label: "Voltaje/corriente", detail: "Revisar el voltaje de batería y la corriente de recarga.", oficio: ba }
        );
        // Añadimos el Anexo 3 a las tareas existentes del baterólogo.
        acumuladoresSubgroup.items.push({
          code: "4-A-ANEXO-3",
          label: "Anexo 3 - Tabla para medición de baterías",
          detail: "Valores de tensión de cada elemento del acumulador 1 y 2 TC1 y TC2 (1,9V < Tensión < 2,4V o 11,4V < Tensión < 14,4V).",
          oficio: ba,
          anexoBaterias: true,
        });

        // Reordenamos los items para que queden en el orden correcto
        acumuladoresSubgroup.items.sort((a, b) => a.code.localeCompare(b.code));
      }
    }

    const seccionCompresores = bimestralSections.find(s => s.id === 'q3');
    if (seccionCompresores) {
      const compresorSubgroup = seccionCompresores.subgroups.find(sg => sg.code === '3-A');
      if (compresorSubgroup) {
        // Sacamos la limpieza de compresor para el operario en la bimestral.
        compresorSubgroup.items = compresorSubgroup.items.filter(item => item.code !== '3-A-11' || item.oficio !== op);
      }
    }

    // Tareas adicionales específicas para la planilla bimestral
    const TAREAS_ADICIONALES_BIMESTRAL: ChecklistSection[] = [
      {
        id: "q6",
        order: "6",
        group: "BAJO BASTIDOR",
        title: "CAJA DE EQUIPAMIENTOS",
        subgroups: [{
          code: "6-B", // INVERSOR AUXILIAR SIV
          title: "INVERSOR AUXILIAR SIV",
          items: [{ code: "6-B-SIV", label: "Limpieza de SIVs", detail: "Limpieza general de SIVs.", oficio: op }],
        }],
      },
    ];

    // 3. Fusionamos las tareas adicionales a la planilla.
    return mergePlanillas(bimestralSections, TAREAS_ADICIONALES_BIMESTRAL);
  })(),
}

export const PLANILLAS: Record<PlanillaTipo, Planilla> = {
  quincenal: PLANILLA_QUINCENAL,
  bimestral: PLANILLA_BIMESTRAL,
}

export function getAllItems(planilla: Planilla): ChecklistItem[] {
  return planilla.sections.flatMap((s) => s.subgroups.flatMap((sg) => sg.items))
}
