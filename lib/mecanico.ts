import type { ChecklistSection } from "./planillas"
import type { OficioId } from "./oficios"

const me: OficioId = "mecanico"

export const TAREAS_MECANICO: ChecklistSection[] = [
  {
    id: "q1",
    order: "1",
    group: "SOBRE BASTIDOR",
    title: "CABINA CONDUCCIÓN y SALÓN DE PASAJEROS",
    subgroups: [{ code: "1-V", title: "ESTADO DE RESORTES BAJO PASARELA", items: [{ code: "1-V", label: "Resortes bajo pasarela", detail: "Visual, integridad del sistema.", oficio: me }] }],
  },
  {
    id: "q2",
    order: "2",
    group: "SOBRE BASTIDOR",
    title: "CARROCERÍA",
    subgroups: [
      { code: "2-E", title: "ANTI ACABALLAMIENTO", items: [{ code: "2-E", label: "Anti acaballamiento", detail: "Vinculaciones y estado general.", oficio: me }] },
      { code: "2-F-me", title: "FUELLE EXTERNO", items: [{ code: "2-F-me", label: "Fuelle externo (Mecánico)", detail: "Integridad de tela y costura.", oficio: me }] },
      { code: "2-H", title: "ENGANCHE SEMI AUTOMÁTICO", items: [{ code: "2-H-1", label: "Integridad", detail: "Integridad del sistema, visualización de mecanismo.", oficio: me }, { code: "2-H-2", label: "Acoples neumáticos", detail: "Estanqueidad de acoples neumáticos / mangas.", oficio: me }, { code: "2-H-4", label: "Libre movimiento", detail: "Verificar el libre movimiento del sistema de apertura 5 veces.", oficio: me }, { code: "2-H-5", label: "Bridas", detail: "Integridad de bridas, vinculaciones y traba de seguridad.", oficio: me }, { code: "2-H-6", label: "Vinculaciones", detail: "Vinculaciones del enganche al coche y traba de seguridad.", oficio: me }, { code: "2-H-7", label: "Altura", detail: "Verificar altura desde riel 880 +/- 10mm.", oficio: me }] },
      { code: "2-I", title: "ENGANCHE SEMI PERMANENTE", items: [{ code: "2-I-1", label: "Integridad", detail: "Integridad del sistema.", oficio: me }, { code: "2-I-2", label: "Mangas/acoples", detail: "Estanqueidad de mangas / acoples.", oficio: me }, { code: "2-I-3", label: "Bridas", detail: "Integridad de bridas, vinculaciones y traba de seguridad.", oficio: me }, { code: "2-I-4", label: "Tubos trituración", detail: "Estado de los tubos de trituración / testigo rojo.", oficio: me }, { code: "2-I-5", label: "Vinculaciones", detail: "Vinculaciones del enganche al coche y traba de seguridad.", oficio: me }, { code: "2-I-6", label: "Amortiguador goma", detail: "Visualmente estado del amortiguador de goma del acoplador.", oficio: me }] },
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
          { code: "5-A-1-me", label: "Integridad viga", detail: "Integridad y aspecto de la viga / quemaduras por arco.", oficio: me },
          { code: "5-A-2-me", label: "Vinculaciones", detail: "Vinculaciones del sistema al bogie, silent-blocks, tornillería.", oficio: me },
          { code: "5-A-3-me", label: "Movimiento", detail: "Libre movimiento del sistema basculante y su resorte.", oficio: me },
          { code: "5-A-4-me", label: "Altura patín", detail: "Altura del patín (86 mm) con calibre.", oficio: me },
          { code: "5-A-5-me", label: "Desgaste pastilla", detail: "Desgaste de pastilla, si se observa el testigo reemplazar.", oficio: me },
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
          { code: "5-E-6", label: "Tornillo correderas", detail: "Tornillo de correderas de movimiento.", oficio: me },
          { code: "5-E-7", label: "Punta de eje", detail: "Bogie - punta de eje.", oficio: me },
          { code: "5-E-8", label: "Temperatura", detail: "Monitorear temperatura mediante cintas térmicas. Utilizar cartilla R-LS-MR-CE-RTPE-001.", oficio: me },
        ],
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
      { code: "5-H", title: "ACOPLE DE CAJA (MANCHÓN)", items: [{ code: "5-H-1", label: "Estado visual", detail: "Estado visual, pérdidas de fluido.", oficio: me }, { code: "5-H-2", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: me }] },
      { code: "5-I", title: "CAJA DE ENGRANAJES", items: [{ code: "5-I-1", label: "Nivel de aceite", detail: "Nivel de aceite y existencia de fugas.", oficio: me }, { code: "5-I-2", label: "Tapón llenado", detail: "Tapón de llenado sin limaduras de hierro. Estado de la caja y tapones con alambrado de seguridad.", oficio: me }, { code: "5-I-3", label: "Silent-block biela", detail: "Controlar estado de silentblock de biela de reacción a caja de engranajes.", oficio: me }, { code: "5-I-4", label: "Carcasa", detail: "Estado general de carcasa (golpes, rayones, etc.).", oficio: me }, { code: "5-I-5", label: "Biela reacción", detail: "Bogie - silentblock de biela de reacción de caja de engranaje.", oficio: me }] },
      { code: "5-J", title: "RESORTE DE AIRE", items: [{ code: "5-J-1", label: "Superficie goma", detail: "Superficie de goma: sin cortes, rajaduras o protuberancias.", oficio: me }, { code: "5-J-2", label: "Pérdidas aire", detail: "Auditivamente pérdidas de aire.", oficio: me }] },
      { code: "5-K", title: "CENTRO DE BOGIE", items: [{ code: "5-K-1", label: "Marcas/rayaduras", detail: "Inspeccionar visualmente la existencia de marcas/rayaduras.", oficio: me }, { code: "5-K-2", label: "Tornillos", detail: "Verificar el ajuste de los tornillos y su alambre de seguridad en todo el conjunto.", oficio: me }, { code: "5-K-3", label: "Juego cubierta", detail: "Verificar juego entre cubierta inferior y viga (5-10mm).", oficio: me }, { code: "5-K-4", label: "Barras tracción", detail: "Estado de barras de tracción, silent-blocks.", oficio: me }] },
      { code: "5-L", title: "TOPES LATERALES DE CENTRO DE BOGIE", items: [{ code: "5-L-1", label: "Tope goma", detail: "Visualmente el tope de goma y su vinculación.", oficio: me }, { code: "5-L-2", label: "Medición", detail: "Medir entre detenedor y estructura de viga de tracción (15 mm, +0mm, -1mm).", oficio: me }] },
      { code: "5-M", title: "TOPES VERTICALES DE CENTRO DE BOGIE", items: [{ code: "5-M-1", label: "Desgaste", detail: "Desgaste de las piezas de contacto, sin grietas.", oficio: me }, { code: "5-M-2", label: "Medición", detail: "Medir c/balonas infladas (AW0) dist: 42mm +/- 3mm.", oficio: me }] },
      { code: "5-N", title: "VÁLVULA DE ALTURA Y SU DISPOSITIVO", items: [{ code: "5-N-1", label: "Aspecto general", detail: "Aspecto general del conjunto, verificar movimiento y juego de barra. Correcta fijación de la base.", oficio: me }, { code: "5-N-2", label: "Pérdida aire", detail: "Auditiva de pérdida de aire.", oficio: me }] },
      { code: "5-O", title: "VÁLVULA DE PRESIÓN DIFERENCIAL", items: [{ code: "5-O-1", label: "Alambres seguridad", detail: "Aspecto e integridad de alambres de seguridad.", oficio: me }, { code: "5-O-2", label: "Pérdida aire", detail: "Auditiva de pérdida de aire.", oficio: me }] },
      { code: "5-P", title: "AMORTIGUADOR TRANSVERSAL DE ACEITE", items: [{ code: "5-P-1", label: "Pérdidas fluido", detail: "Controlar pérdidas de fluido.", oficio: me }, { code: "5-P-2", label: "Vinculación", detail: "Visualmente vinculación y alambrado de seguridad.", oficio: me }, { code: "5-P-3", label: "Silent-block", detail: "Estado de los silent-block.", oficio: me }] },
      { code: "5-S", title: "INSTALACIÓN NEUMÁTICA", items: [{ code: "5-S-1", label: "Vinculaciones", detail: "Visual de las vinculaciones, alambres de seguridad.", oficio: me }, { code: "5-S-2", label: "Mangas freno", detail: "Visual de las mangas de freno, estado de terminales.", oficio: me }, { code: "5-S-3", label: "Accesorios", detail: "Posiciones correctas de accesorios.", oficio: me }, { code: "5-S-4", label: "Pérdidas aire", detail: "Comprobar de manera auditiva la presencia de pérdidas de aire.", oficio: me }] },
      { code: "5-R", title: "MECÁNICA DE FRENO (CÁLIPER)", items: [{ code: "5-R-1", label: "Estado general", detail: "Visualmente el estado general del conjunto.", oficio: me }, { code: "5-R-2", label: "Libre movimiento", detail: "Libre movimiento del mecanismo.", oficio: me }, { code: "5-R-3", label: "Pérdidas aceite", detail: "Pérdidas de aceite en el cilindro.", oficio: me }, { code: "5-R-4", label: "Espesor pastilla", detail: "Espesor pastilla: mínimo 5mm. Si es menor: cambiar.", oficio: me }, { code: "5-R-5", label: "Freno aplicado", detail: "Con freno aplicado escuchar posibles pérdidas.", oficio: me }, { code: "5-R-6", label: "Juego pastilla/disco", detail: "Juego entre pastilla y disco por lado será 2-4mm.", oficio: me }] },
      { code: "5-T", title: "DISPOSITIVO DE LUBRICACIÓN DE LLANTAS", items: [{ code: "5-T-1", label: "Instalación", detail: "Estado general de la instalación, deformaciones.", oficio: me }, { code: "5-T-2", label: "Escobilla", detail: "Estado escobilla, reemplazar si es necesario.", oficio: me }, { code: "5-T-3", label: "Juego porta/pestaña", detail: "Juego entre porta y pestaña de 12 a 14 mm.", oficio: me }, { code: "5-T-4", label: "Contacto llanta", detail: "El lubricador debe hacer contacto con la llanta.", oficio: me }] },
      { code: "5-U", title: "DISCO DE FRENO", items: [{ code: "5-U-1", label: "Inspección visual", detail: "Inspección visual del disco de freno.", oficio: me }, { code: "5-U-2", label: "Deterioros", detail: "Deterioros, rajaduras o marcas en disco de freno.", oficio: me }, { code: "5-U-3", label: "Estándar grietas", detail: "Estándar de inspección de grietas y desgaste anormal según cartilla.", oficio: me }, { code: "5-U-4", label: "Uniones", detail: "Revisión visual de las uniones atornilladas.", oficio: me }, { code: "5-U-5", label: "Lacrado", detail: "Integridad del lacrado entre la tuerca y el tornillo.", oficio: me }] },
      { code: "5-V", title: "QUITAPIEDRAS", items: [{ code: "5-V", label: "Quitapiedras", detail: "En condición de trabajo AW0, ajustar la distancia entre la parte inferior del quitapiedras y el riel entre 85-100 mm.", oficio: me }] },
    ],
  },
  {
    id: "q7",
    order: "7",
    group: "BAJO BASTIDOR",
    title: "INSTALACIONES",
    subgroups: [
      {
        code: "7-A",
        title: "INSTALACIÓN NEUMÁTICA",
        items: [
          { code: "7-A-1", label: "Vinculaciones", detail: "Vinculaciones y trabas de seguridad.", oficio: me },
          { code: "7-A-2", label: "Pérdidas aire", detail: "Controlar pérdidas de manera auditiva.", oficio: me },
          { code: "7-A-3", label: "Purgas tanque", detail: "Purgas de tanque principales.", oficio: me },
          { code: "7-A-4", label: "Grifos coche", detail: "Estado de los grifos del coche.", oficio: me },
          { code: "7-A-5", label: "Mangas", detail: "Mangas entre coches.", oficio: me },
          { code: "7-A-6", label: "Grifos habilitación", detail: "Grifos de habilitación de rack de freno abiertos (bajo asiento en salón).", oficio: me },
        ],
      },
    ],
  },
  {
    id: "anexo-mecanico",
    order: "8",
    group: "ANEXOS",
    title: "Anexo 2: Tabla para control de partes bajo bastidor",
    subgroups: [
      {
        code: "ANEXO-2",
        title: "Marcar los elementos según corresponda",
        items: [
          {
            code: "ANX-MEC",
            label: "Tablas de control",
            detail: "Utilice las tablas para registrar balonas, amortiguadores, lubricadores y pastillas.",
            oficio: me,
            anexoMecanico: true,
          },
        ],
      },
    ],
  },
]