import type { OficioId } from "./oficios"

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
export const PLANILLA_QUINCENAL: Planilla = {
  tipo: "quincenal",
  nombre: "Mantenimiento Quincenal",
  codigo: "CM-CCEE-CSR 440 LM-LS-1676-QI-NU-V1.2-LS",
  version: "1.2",
  vigencia: "30/05/2025",
  sections: [
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
          code: "1-B",
          title: "TABLERO",
          items: [
            { code: "1-B", label: "Tablero", detail: "Encendido de luces internas e instrumentos del tablero.", oficio: cb },
          ],
        },
        {
          code: "1-C",
          title: "LUCES EXTERIORES",
          items: [{ code: "1-C", label: "Luces exteriores", detail: "Encendido de luces rojas, bajas y altas.", oficio: el }],
        },
        {
          code: "1-D",
          title: "ILUMINACIÓN DE CABINA",
          items: [
            { code: "1-D", label: "Iluminación de cabina", detail: "Visual / Reemplazar lámparas que no encienden.", oficio: cb },
          ],
        },
        {
          code: "1-D-1",
          title: "CÁMARAS",
          items: [{ code: "1-D-1", label: "Cámaras", detail: "Correcto funcionamiento en toda la formación.", oficio: cb }],
        },
        {
          code: "1-D-2",
          title: "AIRE ACONDICIONADO",
          items: [{ code: "1-D-2", label: "Aire acondicionado", detail: "Correcto funcionamiento del sistema.", oficio: cb }],
        },
        {
          code: "1-E",
          title: "RADIO",
          items: [{ code: "1-E", label: "Radio", detail: "Funcionamiento correcto.", oficio: cb }],
        },
        {
          code: "1-F",
          title: "GABINETES ELÉCTRICOS",
          items: [{ code: "1-F", label: "Gabinetes eléctricos", detail: "Estado general de contactores.", oficio: cb }],
        },
        {
          code: "1-G",
          title: "SISTEMA PIDS",
          items: [{ code: "1-G", label: "Sistema PIDS", detail: "Sistema de audio, verificar megáfono.", oficio: cb }],
        },
        {
          code: "1-H",
          title: "ASIENTO CONDUCTOR",
          items: [
            { code: "1-H", label: "Asiento conductor", detail: "Inspeccionar por medio del dispositivo de ajuste.", oficio: ca },
          ],
        },
        {
          code: "1-I",
          title: "PARASOL",
          items: [
            { code: "1-I", label: "Parasol", detail: "Estado, limpieza y tornillería de fijación. Movimiento suave.", oficio: ca },
          ],
        },
        {
          code: "1-J",
          title: "LIMPIA PARABRISAS",
          items: [
            { code: "1-J-1", label: "Funcionamiento", detail: "Funcionamiento mecánico y del aspersor (sapito).", oficio: ca },
            { code: "1-J-2", label: "Escobillas", detail: "Estado de escobillas y nivel de líquido (reponerlo si falta).", oficio: ca },
          ],
        },
        {
          code: "1-K",
          title: "PARABRISAS",
          items: [{ code: "1-K", label: "Parabrisas", detail: "Libre de rayas / rajaduras. Visual termostato.", oficio: ca }],
        },
        {
          code: "1-L",
          title: "BOCINA",
          items: [
            { code: "1-L-1", label: "Prueba sonora", detail: "Prueba sonora por pedal y pulsador de tablero.", oficio: cb },
            { code: "1-L-2", label: "Limpieza pedal", detail: "Limpieza de pedal por aspirado.", oficio: cb },
          ],
        },
        {
          code: "1-M",
          title: "PEDAL HOMBRE MUERTO",
          items: [
            { code: "1-M-1", label: "Limpieza pedal", detail: "Limpieza de pedal por aspirado.", oficio: cb },
            { code: "1-M-2", label: "Pantalla I/O", detail: "Comprobar funcionamiento en pantalla I/O.", oficio: cb },
          ],
        },
        {
          code: "1-N",
          title: "ATS",
          items: [{ code: "1-N", label: "ATS", detail: "Verificar encendido y funcionamiento del sistema.", oficio: cb, precinto: true }],
        },
        {
          code: "1-O",
          title: "ATSD",
          items: [
            { code: "1-O", label: "ATSD", detail: "Verificar encendido y funcionamiento del sistema.", oficio: cb, precinto: true },
          ],
        },
        {
          code: "1-P",
          title: "SKEMP",
          items: [{ code: "1-P", label: "SKEMP", detail: "Verificar precinto.", oficio: cb, precinto: true }],
        },
        {
          code: "1-Q",
          title: "HVAC",
          items: [
            {
              code: "1-Q",
              label: "HVAC",
              detail: "Verificar funcionamiento en control centralizado en todos los coches.",
              oficio: cb,
            },
          ],
        },
        {
          code: "1-R",
          title: "UNIDAD DE CONTROL MICROCOMPUTADORA DE FRENO",
          items: [
            { code: "1-R", label: "Microcomputadora de freno", detail: "Estado general, fijaciones, conexiones, puesta a tierra.", oficio: el },
          ],
        },
        {
          code: "1-S",
          title: "FUELLE Y PASARELA DE INTERCOMUNICACIÓN",
          items: [
            { code: "1-S-1", label: "Fuelle", detail: "Integridad de la tela del fuelle, costuras, fisuras.", oficio: ca },
            { code: "1-S-2", label: "Pasarela", detail: "Integridad de pasarela, estado de las vinculaciones.", oficio: ca },
            { code: "1-S-3", label: "Colizas", detail: "Estado de colizas de desgaste.", oficio: ca },
            { code: "1-S-4", label: "Bisagras", detail: "Estado de bisagras y fijaciones. Libre movimiento.", oficio: ca },
          ],
        },
        {
          code: "1-T",
          title: "PISO",
          items: [{ code: "1-T", label: "Piso", detail: "Integridad y pegado de alfombra de goma.", oficio: ca }],
        },
        {
          code: "1-U",
          title: "ILUMINACIÓN SALÓN DE PASAJEROS",
          items: [{ code: "1-U", label: "Iluminación salón", detail: "Visual / Reemplazar tubos que no encienden.", oficio: op }],
        },
        {
          code: "1-V",
          title: "PUERTA DE CONDUCTOR",
          items: [
            { code: "1-V-1", label: "Apertura/cierre", detail: "Suavidad de apertura y cerrado con llave pentagonal.", oficio: ca },
            { code: "1-V-2", label: "Auto-retención", detail: "Funcional de auto-retención de amortiguación.", oficio: ca },
          ],
        },
        {
          code: "1-W",
          title: "SALÓN",
          items: [
            { code: "1-W", label: "Salón", detail: "Estado general de asientos, pasamanos, interiorismo.", oficio: ca },
            { code: "1-W-1", label: "Resortes bajo pasarela", detail: "Visual, integridad del sistema.", oficio: me },
          ],
        },
        {
          code: "1-X",
          title: "PUERTAS LATERALES DE SALÓN",
          items: [
            { code: "1-X-1", label: "Guía inferior", detail: "Limpieza de guía inferior y umbrales (importante, si no se traba).", oficio: ca },
            { code: "1-X-2", label: "Hojas/vidrio", detail: "Integridad de las hojas, estado del vidrio.", oficio: ca },
            { code: "1-X-3", label: "Apertura/cierre", detail: "Suavidad en la apertura/cierre. Fijaciones.", oficio: ca },
            { code: "1-X-4", label: "Cubierta superior", detail: "Cubierta superior de puerta, cerradura, bisagras.", oficio: ca },
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
        { code: "2-C", title: "LUCES LATERALES", items: [{ code: "2-C", label: "Luces laterales", detail: "Funcionamiento.", oficio: cb }] },
        { code: "2-D", title: "VENTANAS LATERALES", items: [{ code: "2-D", label: "Ventanas laterales", detail: "Integridad, estanqueidad.", oficio: ca }] },
        { code: "2-E", title: "ANTI ACABALLAMIENTO", items: [{ code: "2-E", label: "Anti acaballamiento", detail: "Vinculaciones y estado general.", oficio: me }] },
        { code: "2-F", title: "FUELLE EXTERNO", items: [{ code: "2-F", label: "Fuelle externo", detail: "Integridad de tela y costura.", oficio: ca }] },
      ],
    },
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
            { code: "5-A-1", label: "Integridad viga", detail: "Integridad y aspecto de la viga / quemaduras por arco.", oficio: el },
            { code: "5-A-2", label: "Vinculaciones", detail: "Vinculaciones del sistema al bogie, silent-blocks, tornillería.", oficio: el },
            { code: "5-A-3", label: "Movimiento", detail: "Libre movimiento del sistema basculante y su resorte.", oficio: me },
            { code: "5-A-5", label: "Altura patín", detail: "Altura del patín (86 mm) con calibre.", oficio: el },
            { code: "5-A-6", label: "Desgaste pastilla", detail: "Desgaste de pastilla, si se observa el testigo reemplazar.", oficio: el },
            { code: "5-A-7", label: "Cableado", detail: "Cableado de colector de corriente.", oficio: el },
            { code: "5-A-8", label: "Testigo fusible", detail: "Revisar testigo de fusible: Cambiar quemados.", oficio: el },
          ],
        },
        {
          code: "5-B",
          title: "ESTRUCTURA GENERAL DEL BASTIDOR",
          items: [
            { code: "5-B-1", label: "Visual conjunto", detail: "Visual del estado del conjunto, soldaduras, etc.", oficio: me },
            { code: "5-B-2", label: "Pintura/óxidos", detail: "Estado de la pintura y la presencia de óxidos.", oficio: me },
            { code: "5-B-3", label: "Golpes/rayaduras", detail: "Golpes/rayaduras: no superar el 10% del espesor.", oficio: me },
            { code: "5-B-4", label: "Pérdida de aire", detail: "Pérdida de aire en pulmones / posición del tapón.", oficio: me },
          ],
        },
        {
          code: "5-C",
          title: "AMORTIGUADORES VERTICALES DE PUNTA DE EJE Y LATERALES HORIZONTALES",
          items: [
            { code: "5-C-1", label: "Pérdidas fluido", detail: "Pérdidas de fluido. Integridad general.", oficio: me },
            { code: "5-C-2", label: "Vinculación", detail: "Visualmente su vinculación y alambres de seguridad.", oficio: me },
            { code: "5-C-3", label: "Silent-block", detail: "Estado de los silent-block.", oficio: me },
          ],
        },
        {
          code: "5-D",
          title: "RESORTE SUSPENSIÓN 1°",
          items: [
            { code: "5-D-1", label: "Estado", detail: "Visualmente su estado, libre de deformaciones.", oficio: me },
            { code: "5-D-2", label: "Taco de goma", detail: "Estado del taco de goma inferior.", oficio: me },
          ],
        },
        {
          code: "5-E",
          title: "CAJA DE PUNTA DE EJE y TAPA",
          items: [
            { code: "5-E-1", label: "Integridad", detail: "Integridad general, presencia de golpes, etc.", oficio: me },
            { code: "5-E-2", label: "Vinculaciones", detail: "Vinculaciones y alambrado de seguridad y sello de plomo.", oficio: me },
            { code: "5-E-3", label: "Silent-block", detail: "Estado del silent-block de articulación sin grietas.", oficio: me },
            { code: "5-E-4", label: "Pérdidas grasa", detail: "Pérdidas de grasa del lado tapa y opuesto.", oficio: me },
            { code: "5-E-5", label: "Cables", detail: "Estado de los cables y conexiones de puntas de ejes.", oficio: el },
          ],
        },
        {
          code: "5-F",
          title: "SENSORES DE PUNTA DE EJE",
          items: [{ code: "5-F", label: "Sensores", detail: "Estado y cableado.", oficio: el }],
        },
        {
          code: "5-G",
          title: "PAR MONTADO",
          items: [
            { code: "5-G-1", label: "Integridad", detail: "Visual de su integridad.", oficio: me },
            { code: "5-G-2", label: "Discos", detail: "Desgaste de discos / vinculaciones.", oficio: me },
            { code: "5-G-3", label: "Desfasaje", detail: 'Desfasaje "cero" entre marcas pintura de rueda y eje.', oficio: me },
            { code: "5-G-4", label: "Golpes eje", detail: "Ausencia de golpes / marcas en eje.", oficio: me },
            { code: "5-G-5", label: "Perfil rodadura", detail: "Perfil de rodadura de las ruedas.", oficio: me },
          ],
        },
        {
          code: "5-H",
          title: "ACOPLE DE CAJA (MANCHÓN)",
          items: [
            { code: "5-H-1", label: "Estado visual", detail: "Estado visual, pérdidas de fluido.", oficio: me },
            { code: "5-H-2", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: me },
          ],
        },
        {
          code: "5-I",
          title: "CAJA DE ENGRANAJES",
          items: [
            { code: "5-I-1", label: "Nivel de aceite", detail: "Nivel de aceite y existencia de fugas.", oficio: me },
            { code: "5-I-2", label: "Tapón llenado", detail: "Tapón de llenado sin limaduras de hierro. Estado y alambrado de seguridad.", oficio: me },
            { code: "5-I-3", label: "Silent-block biela", detail: "Controlar estado de silentblock de biela de reacción a caja de engranajes.", oficio: me },
            { code: "5-I-4", label: "Carcasa", detail: "Estado general de carcasa (golpes, rayones, etc.).", oficio: me },
            { code: "5-I-5", label: "Biela reacción", detail: "Bogie - silentblock de biela de reacción de caja de engranaje.", oficio: me },
            { code: "5-I-6", label: "Estado", detail: "Controlar estado de los mismos.", oficio: me },
          ],
        },
        {
          code: "5-J",
          title: "RESORTE DE AIRE",
          items: [
            { code: "5-J-1", label: "Superficie goma", detail: "Superficie de goma: sin cortes, rajaduras o protuberancias.", oficio: me },
            { code: "5-J-2", label: "Pérdidas aire", detail: "Auditivamente pérdidas de aire.", oficio: me },
          ],
        },
        {
          code: "5-K",
          title: "CENTRO DE BOGIE",
          items: [
            { code: "5-K-1", label: "Marcas/rayaduras", detail: "Inspeccionar visualmente la existencia de marcas/rayaduras.", oficio: me },
            { code: "5-K-2", label: "Tornillos", detail: "Verificar el ajuste de los tornillos y su alambre de seguridad en todo el conjunto.", oficio: me },
            { code: "5-K-3", label: "Juego cubierta", detail: "Verificar juego entre cubierta inferior y viga (5-10mm).", oficio: me },
            { code: "5-K-4", label: "Barras tracción", detail: "Estado de barras de tracción, silent-blocks.", oficio: me },
          ],
        },
        {
          code: "5-L",
          title: "TOPES LATERALES DE CENTRO DE BOGIE",
          items: [
            { code: "5-L-1", label: "Tope goma", detail: "Visualmente el tope de goma y su vinculación.", oficio: me },
            { code: "5-L-2", label: "Medición", detail: "Medir entre detenedor y estructura de viga de tracción (15 mm, +0mm, -1mm).", oficio: me },
          ],
        },
        {
          code: "5-M",
          title: "TOPES VERTICALES DE CENTRO DE BOGIE",
          items: [
            { code: "5-M-1", label: "Desgaste", detail: "Desgaste de las piezas de contacto, sin grietas.", oficio: me },
            { code: "5-M-2", label: "Medición", detail: "Medir c/balonas infladas (AW0) dist: 42mm +/- 3mm.", oficio: me },
          ],
        },
        {
          code: "5-N",
          title: "VÁLVULA DE ALTURA Y SU DISPOSITIVO",
          items: [
            { code: "5-N-1", label: "Aspecto general", detail: "Aspecto general del conjunto, verificar movimiento y juego de barra. Correcta fijación de la base.", oficio: me },
            { code: "5-N-2", label: "Pérdida aire", detail: "Auditiva de pérdida de aire.", oficio: me },
          ],
        },
        {
          code: "5-O",
          title: "VÁLVULA DE PRESIÓN DIFERENCIAL",
          items: [
            { code: "5-O-1", label: "Alambres seguridad", detail: "Aspecto e integridad de alambres de seguridad.", oficio: me },
            { code: "5-O-2", label: "Pérdida aire", detail: "Auditiva de pérdida de aire.", oficio: me },
          ],
        },
        {
          code: "5-P",
          title: "AMORTIGUADOR TRANSVERSAL DE ACEITE",
          items: [
            { code: "5-P-1", label: "Pérdidas fluido", detail: "Controlar pérdidas de fluido.", oficio: me },
            { code: "5-P-2", label: "Vinculación", detail: "Visualmente vinculación y alambrado de seguridad.", oficio: me },
            { code: "5-P-3", label: "Silent-block", detail: "Estado de los silent-block.", oficio: me },
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
        {
          code: "7-B",
          title: "ELÉCTRICA",
          items: [
            { code: "7-B-3", label: "Cableado", detail: "Integridad general del cableado.", oficio: el },
            { code: "7-B-4", label: "Mangas", detail: "Mangas entre coches.", oficio: el },
            { code: "7-B-5", label: "Gabinetes", detail: "Estado de gabinetes.", oficio: el },
          ],
        },
        {
          code: "7-C",
          title: "UNIDAD DE CONTROL DE FRENO",
          items: [
            { code: "7-C-1", label: "Gabinete", detail: "Estado del gabinete, vinculaciones, puesta a tierra.", oficio: el },
            { code: "7-C-2", label: "Conexiones", detail: "Aspecto de las conexiones y de los componentes.", oficio: el },
          ],
        },
        {
          code: "7-D",
          title: "UNIDAD AUXILIAR DE FRENO",
          items: [
            { code: "7-D-1", label: "Gabinete", detail: "Estado del gabinete, vinculaciones, puesta a tierra.", oficio: el },
            { code: "7-D-2", label: "Conexiones", detail: "Aspecto de las conexiones y de los componentes.", oficio: el },
          ],
        },
      ],
    },
  ],
}

// ---------------------------------------------------------------------------
// PLANILLA BIMESTRAL (CM-CCEE-CSR 440 LM-LS-1676-BI-NU-V7.1-LS)
// ---------------------------------------------------------------------------
export const PLANILLA_BIMESTRAL: Planilla = {
  tipo: "bimestral",
  nombre: "Mantenimiento Bimestral",
  codigo: "CM-CCEE-CSR 440 LM-LS-1676-BI-NU-V7.1-LS",
  version: "7.1",
  vigencia: "30/05/2025",
  sections: [
    {
      id: "b1",
      order: "1",
      group: "SOBRE BASTIDOR",
      title: "CABINA CONDUCCIÓN y SALÓN DE PASAJEROS",
      subgroups: [
        { code: "1-A", title: "ENCENDIDO", items: [{ code: "1-A", label: "Encendido", detail: "Encendido con baterías.", oficio: cb }] },
        { code: "1-B", title: "TABLERO", items: [{ code: "1-B", label: "Tablero", detail: "Encendido de luces internas e instrumentos del tablero.", oficio: cb }] },
        { code: "1-C", title: "LUCES EXTERIORES", items: [{ code: "1-C", label: "Luces exteriores", detail: "Encendido de luces rojas, bajas y altas.", oficio: el }] },
        { code: "1-D", title: "ILUMINACIÓN DE CABINA", items: [{ code: "1-D", label: "Iluminación de cabina", detail: "Visual / Reemplazar lámparas que no encienden.", oficio: cb }] },
        { code: "1-E", title: "RADIO", items: [{ code: "1-E", label: "Radio", detail: "Funcionamiento correcto.", oficio: cb }] },
        { code: "1-F", title: "CÁMARAS", items: [{ code: "1-F", label: "Cámaras", detail: "Correcto funcionamiento en toda la formación.", oficio: cb }] },
        { code: "1-G", title: "GABINETES ELÉCTRICOS", items: [{ code: "1-G", label: "Gabinetes eléctricos", detail: "Estado general de contactores, relés.", oficio: cb }] },
        { code: "1-H", title: "SISTEMA PIDS", items: [{ code: "1-H", label: "Sistema PIDS", detail: "Sistema de audio, verificar megáfono.", oficio: cb }] },
        { code: "1-I", title: "AIRE ACONDICIONADO", items: [{ code: "1-I", label: "Aire acondicionado", detail: "Correcto funcionamiento del sistema.", oficio: cb }] },
        { code: "1-J", title: "ASIENTO CONDUCTOR", items: [{ code: "1-J", label: "Asiento conductor", detail: "Inspeccionar por medio del dispositivo de ajuste.", oficio: ca }] },
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
        { code: "1-P", title: "ATS", items: [{ code: "1-P", label: "ATS", detail: "Verificar encendido y funcionamiento del sistema.", oficio: cb, precinto: true }] },
        { code: "1-Q", title: "ATSD", items: [{ code: "1-Q", label: "ATSD", detail: "Verificar encendido y funcionamiento del sistema.", oficio: cb, precinto: true }] },
        { code: "1-R", title: "SKEMP", items: [{ code: "1-R", label: "SKEMP", detail: "Verificar precinto.", oficio: cb, precinto: true }] },
        { code: "1-S", title: "HVAC", items: [{ code: "1-S", label: "HVAC", detail: "Verificar funcionamiento en control centralizado en todos los coches.", oficio: cb }] },
        { code: "1-T", title: "UNIDAD DE CONTROL MICROCOMPUTADORA DE FRENO", items: [{ code: "1-T", label: "Microcomputadora de freno", detail: "Estado general, fijaciones, conexiones, puesta a tierra.", oficio: el }] },
        {
          code: "1-U",
          title: "FUELLE Y PASARELA DE INTERCOMUNICACIÓN",
          items: [
            { code: "1-T-1", label: "Fuelle", detail: "Integridad de la tela del fuelle, costuras, fisuras.", oficio: ca },
            { code: "1-T-2", label: "Pasarela", detail: "Integridad de pasarela, estado de las vinculaciones.", oficio: ca },
            { code: "1-T-3", label: "Colizas", detail: "Estado de colizas de desgaste.", oficio: ca },
            { code: "1-T-4", label: "Bisagras", detail: "Estado de bisagras y fijaciones. Libre movimiento.", oficio: ca },
          ],
        },
        { code: "1-W", title: "ESTADO DE RESORTES BAJO PASARELA", items: [{ code: "1-W", label: "Resortes bajo pasarela", detail: "Visual, integridad del sistema.", oficio: me }] },
        { code: "1-X", title: "ILUMINACIÓN SALÓN DE PASAJEROS", items: [{ code: "1-X", label: "Iluminación salón", detail: "Visual / Reemplazar tubos que no encienden.", oficio: op }] },
        { code: "1-Y", title: "PISO", items: [{ code: "1-Y", label: "Piso", detail: "Integridad y pegado de alfombra de goma.", oficio: ca }] },
        {
          code: "1-Z",
          title: "PUERTA DE CONDUCTOR",
          items: [
            { code: "1-Z-1", label: "Apertura/cierre", detail: "Suavidad de apertura y cerrado con llave pentagonal.", oficio: ca },
            { code: "1-Z-2", label: "Auto-retención", detail: "Funcional de auto-retención de amortiguación.", oficio: ca },
          ],
        },
        { code: "1-AA", title: "SALÓN", items: [{ code: "1-AA", label: "Salón", detail: "Estado general de asientos, pasamanos, interiorismo.", oficio: ca }] },
        {
          code: "1-AB",
          title: "PUERTAS LATERALES DE SALÓN",
          items: [
            { code: "1-AB-1", label: "Guía inferior", detail: "Limpieza de guía inferior y umbrales (importante, si no se traba).", oficio: ca },
            { code: "1-AB-2", label: "Hojas/vidrio", detail: "Integridad de las hojas, estado del vidrio.", oficio: ca },
            { code: "1-AB-3", label: "Apertura/cierre", detail: "Suavidad en la apertura/cierre. Fijaciones.", oficio: ca },
            { code: "1-AB-4", label: "Finales carrera", detail: "Integridad de finales de carrera y sus fijaciones.", oficio: el },
            { code: "1-AB-5", label: "Motor/topes", detail: "Montaje de motor y topes de amortiguación.", oficio: me },
            { code: "1-AB-7", label: "Cubierta superior", detail: "Cubierta superior de puerta, cerradura, bisagras.", oficio: ca },
          ],
        },
      ],
    },
    {
      id: "b2",
      order: "2",
      group: "SOBRE BASTIDOR",
      title: "CARROCERÍA",
      subgroups: [
        { code: "2-A", title: "ESTADO DE LA PINTURA", items: [{ code: "2-A", label: "Pintura", detail: "Integridad general.", oficio: ca }] },
        { code: "2-B", title: "CALCOS REFLECTIVOS", items: [{ code: "2-B", label: "Calcos reflectivos", detail: "Integridad general.", oficio: ca }] },
        { code: "2-C", title: "LUCES LATERALES", items: [{ code: "2-C", label: "Luces laterales", detail: "Funcionamiento.", oficio: cb }] },
        { code: "2-D", title: "VENTANAS LATERALES", items: [{ code: "2-D", label: "Ventanas laterales", detail: "Integridad, estanqueidad.", oficio: ca }] },
        { code: "2-E", title: "ANTI ACABALLAMIENTO", items: [{ code: "2-E", label: "Anti acaballamiento", detail: "Vinculaciones y estado general.", oficio: me }] },
        { code: "2-F", title: "FUELLE EXTERNO", items: [{ code: "2-F", label: "Fuelle externo", detail: "Integridad de tela y costura.", oficio: ca }] },
        { code: "2-G", title: "CABLES ENTRE COCHES", items: [{ code: "2-G", label: "Cables entre coches", detail: "Integridad de cables de potencia y sincronismo.", oficio: el }] },
        {
          code: "2-H",
          title: "ENGANCHE SEMI AUTOMÁTICO",
          items: [
            { code: "2-H-1", label: "Integridad", detail: "Integridad del sistema, visualización de mecanismo.", oficio: me },
            { code: "2-H-2", label: "Acoples neumáticos", detail: "Estanqueidad de acoples neumáticos / mangas.", oficio: me },
            { code: "2-H-3", label: "Cables a tierra", detail: "Fijaciones y estado de los cables a tierra.", oficio: el },
            { code: "2-H-4", label: "Libre movimiento", detail: "Verificar el libre movimiento del sistema de apertura 5 veces.", oficio: me },
            { code: "2-H-5", label: "Bridas", detail: "Integridad de bridas, vinculaciones y traba de seguridad.", oficio: me },
            { code: "2-H-6", label: "Vinculaciones", detail: "Vinculaciones del enganche al coche y traba de seguridad.", oficio: me },
            { code: "2-H-7", label: "Altura", detail: "Verificar altura desde riel 880 +/- 10mm.", oficio: me },
          ],
        },
        {
          code: "2-I",
          title: "ENGANCHE SEMI PERMANENTE",
          items: [
            { code: "2-I-1", label: "Integridad", detail: "Integridad del sistema.", oficio: me },
            { code: "2-I-2", label: "Mangas/acoples", detail: "Estanqueidad de mangas / acoples.", oficio: me },
            { code: "2-I-3", label: "Bridas", detail: "Integridad de bridas, vinculaciones y traba de seguridad.", oficio: me },
            { code: "2-I-4", label: "Tubos trituración", detail: "Estado de los tubos de trituración / testigo rojo.", oficio: me },
            { code: "2-I-5", label: "Vinculaciones", detail: "Vinculaciones del enganche al coche y traba de seguridad.", oficio: me },
            { code: "2-I-6", label: "Amortiguador goma", detail: "Visualmente estado del amortiguador de goma del acoplador.", oficio: me },
          ],
        },
      ],
    },
    {
      id: "b3",
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
            { code: "3-A-4", label: "Sonido", detail: "Inspeccionar en funcionamiento el sonido normal sin ruidos extraños ni pérdidas de aire / aceite.", oficio: ac },
            { code: "3-A-5", label: "Aspecto general", detail: "Aspecto general, sin golpes ni daños.", oficio: ac },
            { code: "3-A-6", label: "Fijaciones", detail: "Estado de fijaciones, silent-block de apoyo.", oficio: ac },
            { code: "3-A-7", label: "Cables/tierra", detail: "Estado de cables, puestas a tierra y flexible de salida.", oficio: ac },
            { code: "3-A-8", label: "Purgar separador", detail: "Purgar el separador de aceite hasta salir aire limpio.", oficio: ac },
            { code: "3-A-9", label: "Precintar válvula", detail: "Precintar válvula de seguridad.", oficio: ac },
            { code: "3-A-10", label: "Fijaciones/daños", detail: "Fijaciones, signos de sobrecalentamientos, daños.", oficio: ac },
            { code: "3-A-11", label: "Filtro de aire", detail: "Control de indicador de vacío en filtro de aire.", oficio: ac },
            { code: "3-A-12", label: "Llenado formación", detail: "Encender un compresor y verificar el llenado de la formación en menos de 30 minutos.", oficio: ac },
          ],
        },
      ],
    },
    {
      id: "b4",
      order: "4",
      group: "BAJO BASTIDOR",
      title: "CAJÓN DE BATERÍAS",
      subgroups: [
        {
          code: "4-A",
          title: "ACUMULADORES",
          items: [
            { code: "4-A-1", label: "Limpieza", detail: "Limpieza interior y exterior de armario con aire comprimido de 2 a 3 kg/cm².", oficio: ba },
            { code: "4-A-2", label: "Estanqueidad", detail: "Estanqueidad y estado de las cerraduras.", oficio: ba },
            { code: "4-A-3", label: "Apariencia", detail: "Apariencia, fijaciones, cableado.", oficio: ba },
            { code: "4-A-4", label: "Voltaje/corriente", detail: "Revisar el voltaje de batería y la corriente de recarga.", oficio: ba },
            { code: "4-A-5", label: "Flotación", detail: "El voltaje de flotación debe ser 113.5V +/-1%. Corriente de recarga menos de 2% de la nominal.", oficio: ba },
            { code: "4-A-6", label: "Tensión vaso", detail: "Medir tensión de cada vaso 1.75V - 2.35V.", oficio: ba },
            { code: "4-A-7", label: "Tensión TC1 (VTC1)", detail: "Controlar valor de tensión flotante en TC1. 105V < Tensión < 125V.", oficio: ba },
            { code: "4-A-8", label: "Tensión TC2 (VTC2)", detail: "Controlar valor de tensión flotante en TC2. 105V < Tensión < 125V.", oficio: ba },
          ],
        },
      ],
    },
    {
      id: "b5",
      order: "5",
      group: "BAJO BASTIDOR",
      title: "BOGIES",
      subgroups: [
        {
          code: "5-A",
          title: "COLECTOR DE CORRIENTE",
          items: [
            { code: "5-A-4", label: "Limpieza", detail: "Limpieza en seco del conjunto colector de corriente.", oficio: el },
          ],
        },
        {
          code: "5-B",
          title: "ESTRUCTURA GENERAL DEL BASTIDOR",
          items: [
            { code: "5-B-1", label: "Visual conjunto", detail: "Visual del estado del conjunto, soldaduras, etc.", oficio: me },
            { code: "5-B-2", label: "Pintura/óxidos", detail: "Estado de la pintura y la presencia de óxidos.", oficio: me },
            { code: "5-B-3", label: "Golpes/rayaduras", detail: "Golpes/rayaduras: no superar el 10% del espesor.", oficio: me },
            { code: "5-B-4", label: "Pérdida de aire", detail: "Pérdida de aire en pulmones / posición del tapón.", oficio: me },
          ],
        },
        {
          code: "5-C",
          title: "AMORTIGUADORES VERTICALES DE PUNTA DE EJE Y LATERALES HORIZONTALES",
          items: [
            { code: "5-C-1", label: "Pérdidas fluido", detail: "Pérdidas de fluido. Integridad general.", oficio: me },
            { code: "5-C-2", label: "Vinculación", detail: "Visualmente su vinculación y alambres de seguridad.", oficio: me },
            { code: "5-C-3", label: "Silent-block", detail: "Estado de los silent-block.", oficio: me },
          ],
        },
        {
          code: "5-D",
          title: "RESORTE SUSPENSIÓN 1",
          items: [
            { code: "5-D-2", label: "Estado", detail: "Visualmente su estado, libre de deformaciones.", oficio: me },
            { code: "5-D-3", label: "Taco de goma", detail: "Estado del taco de goma inferior.", oficio: me },
          ],
        },
        {
          code: "5-E",
          title: "CAJA DE PUNTA DE EJE y TAPA",
          items: [
            { code: "5-E-1", label: "Integridad", detail: "Integridad general, presencia de golpes, etc.", oficio: me },
            { code: "5-E-2", label: "Vinculaciones", detail: "Vinculaciones y alambrado de seguridad y sello de plomo.", oficio: me },
            { code: "5-E-3", label: "Silent-block", detail: "Estado del silent-block de articulación sin grietas.", oficio: me },
            { code: "5-E-4", label: "Pérdidas grasa", detail: "Pérdidas de grasa del lado tapa y opuesto.", oficio: me },
            { code: "5-E-5", label: "Cables", detail: "Estado de los cables y conexiones de puntas de ejes.", oficio: el },
            { code: "5-E-6", label: "Tornillo correderas", detail: "Tornillo de correderas de movimiento.", oficio: me },
            { code: "5-E-7", label: "Punta de eje", detail: "Bogie - punta de eje.", oficio: me },
            { code: "5-E-8", label: "Temperatura", detail: "Monitorear temperatura mediante cintas térmicas. Utilizar cartilla R-LS-MR-CE-RTPE-001.", oficio: me },
          ],
        },
        {
          code: "5-F",
          title: "SENSORES DE PUNTA DE EJE",
          items: [{ code: "5-F", label: "Sensores", detail: "Estado y cableado.", oficio: el }],
        },
        {
          code: "5-G",
          title: "PAR MONTADO",
          items: [
            { code: "5-G-1", label: "Integridad", detail: "Visual de su integridad.", oficio: me },
            { code: "5-G-2", label: "Discos", detail: "Desgaste de discos / vinculaciones.", oficio: me },
            { code: "5-G-3", label: "Desfasaje", detail: 'Desfasaje "cero" entre marcas pintura de rueda y eje.', oficio: me },
            { code: "5-G-4", label: "Golpes/marcas eje", detail: "Ausencia de golpes / marcas en eje. Ante marcas con profundidad menor a 1mm, repararlas mediante pulido.", oficio: me },
            { code: "5-G-5", label: "Perfil rodadura", detail: "Perfil de rodadura de las ruedas. Reparar banda de rodadura según estándar.", oficio: me },
          ],
        },
        {
          code: "5-H",
          title: "ACOPLE DE CAJA (MANCHÓN)",
          items: [
            { code: "5-H-1", label: "Estado visual", detail: "Estado visual, pérdidas de fluido.", oficio: me },
            { code: "5-H-2", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: me },
          ],
        },
        {
          code: "5-I",
          title: "CAJA DE ENGRANAJES",
          items: [
            { code: "5-I-1", label: "Nivel de aceite", detail: "Nivel de aceite, entre máx y mín, existencia de fugas.", oficio: me },
            { code: "5-I-2", label: "Tapón llenado", detail: "Tapón de llenado sin limaduras de hierro. Estado de la caja y tapones con alambrado de seguridad.", oficio: me },
            { code: "5-I-3", label: "Silent-block biela", detail: "Bogie - silentblock de biela de reacción de caja de engranaje.", oficio: me },
            { code: "5-I-4", label: "Estado mismos", detail: "Controlar estado de los mismos.", oficio: me },
            { code: "5-I-5", label: "Carcasa", detail: "Estado general de carcasa (golpes, rayones, etc.).", oficio: me },
          ],
        },
        {
          code: "5-J",
          title: "RESORTE DE AIRE",
          items: [
            { code: "5-J-1", label: "Superficie goma", detail: "Superficie de goma: sin cortes, rajaduras o protuberancias.", oficio: me },
            { code: "5-J-2", label: "Pérdidas aire", detail: "Auditivamente pérdidas de aire.", oficio: me },
          ],
        },
        {
          code: "5-K",
          title: "CENTRO DE BOGIE",
          items: [
            { code: "5-K-1", label: "Marcas/rayaduras", detail: "Inspeccionar visualmente la existencia de marcas/rayaduras.", oficio: me },
            { code: "5-K-2", label: "Tornillos", detail: "Verificar el ajuste de los tornillos y su alambre de seguridad en todo el conjunto.", oficio: me },
            { code: "5-K-3", label: "Juego cubierta", detail: "Verificar juego entre cubierta inferior y viga (5-10mm).", oficio: me },
            { code: "5-K-4", label: "Barras tracción", detail: "Estado de barras de tracción, silent-blocks.", oficio: me },
          ],
        },
        {
          code: "5-L",
          title: "TOPES LATERALES DE CENTRO DE BOGIE",
          items: [
            { code: "5-L-1", label: "Tope goma", detail: "Visualmente el tope de goma y su vinculación.", oficio: me },
            { code: "5-L-2", label: "Medición", detail: "Medir entre detenedor y estructura de viga de tracción (15 mm, +0mm, -1mm).", oficio: me },
          ],
        },
        {
          code: "5-M",
          title: "TOPES VERTICALES DE CENTRO DE BOGIE",
          items: [
            { code: "5-M-1", label: "Desgaste", detail: "Desgaste de las piezas de contacto, sin grietas.", oficio: me },
            { code: "5-M-2", label: "Medición", detail: "Medir c/balonas infladas (AW0) dist: 42mm +/- 3mm.", oficio: me },
          ],
        },
        {
          code: "5-N",
          title: "VÁLVULA DE ALTURA Y SU DISPOSITIVO",
          items: [
            { code: "5-N-1", label: "Aspecto general", detail: "Aspecto general del conjunto, verificar movimiento y juego de barra. Correcta fijación de la base.", oficio: me },
            { code: "5-N-2", label: "Pérdida aire", detail: "Controlar de manera auditiva existencia de pérdidas de aire.", oficio: me },
          ],
        },
        {
          code: "5-O",
          title: "VÁLVULA DE PRESIÓN DIFERENCIAL",
          items: [
            { code: "5-O-1", label: "Alambres seguridad", detail: "Aspecto e integridad de alambres de seguridad.", oficio: me },
            { code: "5-O-2", label: "Pérdida aire", detail: "Controlar de manera auditiva existencia de pérdidas de aire.", oficio: me },
          ],
        },
        {
          code: "5-P",
          title: "AMORTIGUADOR TRANSVERSAL DE ACEITE",
          items: [
            { code: "5-P-1", label: "Pérdidas fluido", detail: "Controlar pérdidas de fluido.", oficio: me },
            { code: "5-P-2", label: "Vinculación", detail: "Visualmente vinculación y alambrado de seguridad.", oficio: me },
            { code: "5-P-3", label: "Silent-block", detail: "Estado de los silent-block.", oficio: me },
          ],
        },
        {
          code: "5-Q",
          title: "MOTOR DE TRACCIÓN",
          items: [
            { code: "5-Q-1", label: "Carcasa", detail: "Verificar el estado y el aspecto de la carcasa.", oficio: el },
            { code: "5-Q-2", label: "Vinculaciones", detail: "Visual de las vinculaciones, alambres de seguridad.", oficio: el },
            { code: "5-Q-3", label: "Pérdidas lubricante", detail: "Pérdidas de lubricante.", oficio: el },
            { code: "5-Q-4", label: "Rejillas ventilación", detail: "Objetos extraños en rejillas de ventilación, limpiarlos.", oficio: el },
          ],
        },
        {
          code: "5-R",
          title: "MECÁNICA DE FRENO (CÁLIPER)",
          items: [
            { code: "5-R-1", label: "Estado general", detail: "Visualmente el estado general del conjunto.", oficio: me },
            { code: "5-R-2", label: "Libre movimiento", detail: "Libre movimiento del mecanismo.", oficio: me },
            { code: "5-R-3", label: "Pérdidas aceite", detail: "Pérdidas de aceite en el cilindro.", oficio: me },
            { code: "5-R-4", label: "Espesor pastilla", detail: "Espesor pastilla: mínimo 5mm. Si es menor: cambiar.", oficio: me },
            { code: "5-R-5", label: "Freno aplicado", detail: "Con freno aplicado escuchar posibles pérdidas.", oficio: me },
            { code: "5-R-6", label: "Juego pastilla/disco", detail: "Juego entre pastilla y disco por lado será 2-4mm.", oficio: me },
          ],
        },
        {
          code: "5-S",
          title: "INSTALACIÓN NEUMÁTICA",
          items: [
            { code: "5-S-1", label: "Vinculaciones", detail: "Visual de las vinculaciones, alambres de seguridad.", oficio: me },
            { code: "5-S-2", label: "Mangas freno", detail: "Visual de las mangas de freno, estado de terminales.", oficio: me },
            { code: "5-S-3", label: "Accesorios", detail: "Posiciones correctas de accesorios.", oficio: me },
            { code: "5-S-4", label: "Pérdidas aire", detail: "Comprobar de manera auditiva la presencia de pérdidas de aire.", oficio: me },
          ],
        },
        {
          code: "5-T",
          title: "DISPOSITIVO DE LUBRICACIÓN DE LLANTAS",
          items: [
            { code: "5-T-1", label: "Instalación", detail: "Estado general de la instalación, deformaciones.", oficio: me },
            { code: "5-T-2", label: "Escobilla", detail: "Estado escobilla, reemplazar si es necesario.", oficio: me },
            { code: "5-T-3", label: "Juego porta/pestaña", detail: "Juego entre porta y pestaña de 12 a 14 mm.", oficio: me },
            { code: "5-T-4", label: "Contacto llanta", detail: "El lubricador debe hacer contacto con la llanta.", oficio: me },
          ],
        },
        {
          code: "5-U",
          title: "DISCO DE FRENO",
          items: [
            { code: "5-U-1", label: "Inspección visual", detail: "Inspección visual del disco de freno.", oficio: me },
            { code: "5-U-2", label: "Deterioros", detail: "Deterioros, rajaduras o marcas en disco de freno.", oficio: me },
            { code: "5-U-3", label: "Estándar grietas", detail: "Estándar de inspección de grietas y desgaste anormal según cartilla.", oficio: me },
            { code: "5-U-4", label: "Uniones", detail: "Revisión visual de las uniones atornilladas.", oficio: me },
            { code: "5-U-5", label: "Lacrado", detail: "Integridad del lacrado entre la tuerca y el tornillo.", oficio: me },
          ],
        },
        {
          code: "5-V",
          title: "QUITAPIEDRAS",
          items: [
            { code: "5-V", label: "Quitapiedras", detail: "En condición de trabajo AW0, ajustar la distancia entre la parte inferior del quitapiedras y el riel entre 85-100 mm.", oficio: me },
          ],
        },
        {
          code: "5-W",
          title: "ANTENA ATSD",
          items: [
            { code: "5-W-1", label: "Fijación", detail: "Fijación y estado de antena ATSD con el coche.", oficio: el },
            { code: "5-W-2", label: "Cable ATSD", detail: "Estado general del cable ATSD (golpes, rayaduras).", oficio: el },
            { code: "5-W-3", label: "Distancia BTM", detail: "Distancia entre la antena BTM y la superficie del riel entre 275-285mm.", oficio: el },
          ],
        },
        {
          code: "5-X",
          title: "ANTENA ATS",
          items: [
            { code: "5-X-1", label: "Fijación", detail: "Fijación y estado de antena ATS con el coche.", oficio: el },
            { code: "5-X-2", label: "Tacos generadores", detail: "Estado y fijación de los tacos generadores.", oficio: el },
          ],
        },
      ],
    },
    {
      id: "b6",
      order: "6",
      group: "BAJO BASTIDOR",
      title: "CAJA DE EQUIPAMIENTOS",
      subgroups: [
        {
          code: "6-A",
          title: "ARRANQUE DEL COMPRESOR",
          items: [
            { code: "6-A", label: "Arranque compresor", detail: "Estado del gabinete, cerraduras, hermeticidad, elementos del sistema de arranque del compresor.", oficio: el },
          ],
        },
        {
          code: "6-B",
          title: "INVERSOR AUXILIAR SIV",
          items: [
            { code: "6-B-1", label: "Limpieza", detail: "Limpieza de gabinete en coches TC1, T3 y TC2.", oficio: op },
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
        {
          code: "6-D",
          title: "CAJA BAJO BASTIDOR",
          items: [
            { code: "6-D-1", label: "Gabinete", detail: "Estado del gabinete, cerraduras, hermeticidad.", oficio: el },
            { code: "6-D-2", label: "Vinculaciones", detail: "Vinculaciones, puesta a tierra.", oficio: el },
          ],
        },
        {
          code: "6-E",
          title: "CONTROL COMPUTADORA DE FRENO",
          items: [
            { code: "6-E-1", label: "Aspecto general", detail: "Aspecto general del gabinete y conexiones.", oficio: el },
            { code: "6-E-2", label: "Puestas a tierra", detail: "Puestas a tierra.", oficio: el },
          ],
        },
      ],
    },
    {
      id: "b7",
      order: "7",
      group: "BAJO BASTIDOR",
      title: "INSTALACIONES",
      subgroups: [
        {
          code: "7-A",
          title: "NEUMÁTICA",
          items: [
            { code: "7-A-1", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: me },
            { code: "7-A-2", label: "Pérdidas aire", detail: "Controlar pérdidas de manera auditiva.", oficio: me },
            { code: "7-A-3", label: "Purgas tanque", detail: "Purgas de tanque principales.", oficio: me },
            { code: "7-A-4", label: "Grifos coche", detail: "Estado de los grifos del coche.", oficio: me },
            { code: "7-A-5", label: "Mangas", detail: "Mangas entre coches.", oficio: me },
            { code: "7-A-6", label: "Grifos habilitación", detail: "Grifos de habilitación de rack de freno abiertos (bajo asiento en salón).", oficio: me },
          ],
        },
        {
          code: "7-B",
          title: "ELÉCTRICA",
          items: [
            { code: "7-B-1", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: el },
            { code: "7-B-2", label: "Terminales", detail: "Conexiones de terminales.", oficio: el },
            { code: "7-B-3", label: "Cableado", detail: "Integridad general del cableado.", oficio: el },
            { code: "7-B-4", label: "Mangas", detail: "Mangas entre coches.", oficio: el },
            { code: "7-B-5", label: "Gabinetes", detail: "Estado de gabinetes.", oficio: el },
          ],
        },
        {
          code: "7-C",
          title: "UNIDAD DE CONTROL DE FRENO",
          items: [
            { code: "7-C-1", label: "Gabinete", detail: "Estado del gabinete, vinculaciones, puesta a tierra.", oficio: el },
            { code: "7-C-2", label: "Conexiones", detail: "Aspecto de las conexiones y de los componentes.", oficio: el },
          ],
        },
        {
          code: "7-D",
          title: "UNIDAD AUXILIAR DE FRENO",
          items: [
            { code: "7-D-1", label: "Gabinete", detail: "Estado del gabinete, vinculaciones, puesta a tierra.", oficio: el },
            { code: "7-D-2", label: "Conexiones", detail: "Aspecto de las conexiones y de los componentes.", oficio: el },
          ],
        },
      ],
    },
  ],
}

export const PLANILLAS: Record<PlanillaTipo, Planilla> = {
  quincenal: PLANILLA_QUINCENAL,
  bimestral: PLANILLA_BIMESTRAL,
}

export function getAllItems(planilla: Planilla): ChecklistItem[] {
  return planilla.sections.flatMap((s) => s.subgroups.flatMap((sg) => sg.items))
}
