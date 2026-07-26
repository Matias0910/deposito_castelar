import type { FilaObservacion, PlanillaHeader } from "@/lib/store"
import { Input } from "@/components/ui/input"

interface PlanillaAnexoObservacionesProps {
  header: PlanillaHeader
  filas: FilaObservacion[]
  onFilaChange: (id: number, campo: keyof FilaObservacion, valor: string) => void
}

export function PlanillaAnexoObservaciones({ header, filas, onFilaChange }: PlanillaAnexoObservacionesProps) {
  return (
    <div className="bg-background p-4 sm:p-6 rounded-lg shadow-sm border border-border max-w-7xl mx-auto text-xs font-sans mt-4">
      {/* Cabecera del Documento */}
      <div className="flex justify-between items-start border-b-2 border-black pb-3 mb-4">
        <div>
          <h2 className="font-bold text-sm tracking-tight text-gray-900 dark:text-gray-100">TRENES ARGENTINOS OPERACIONES</h2>
          <p className="text-[10px] text-gray-600 dark:text-gray-400">CM-CCEE-CSR 440-LM-LS-1676-BI-MU-V7.0-LS</p>
        </div>
        <div className="text-right">
          <h1 className="font-bold text-base uppercase text-gray-900 dark:text-gray-100">
            PLANILLA ANEXO DE OBSERVACIONES GENERALES DE LA UNIDAD/UNIDADES
          </h1>
          <p className="text-[10px] text-gray-500 dark:text-gray-400">
            ESTA PLANILLA DEBERÁ ESTAR SIEMPRE ADJUNTA EN EL CAJÓN DE TRABAJO... (VERSIÓN 1.0)
          </p>
        </div>
      </div>

      {/* Metadatos superiores */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-b border-border pb-3 text-sm">
        <div>
          <span className="font-bold">LÍNEA:</span> Sarmiento
        </div>
        <div>
          <span className="font-bold">FECHA Y HORA DE INICIO:</span>{" "}
          {header.fechaIngreso ? new Date(header.fechaIngreso).toLocaleString() : "_________________"}
        </div>
        <div>
          <span className="font-bold">FECHA Y HORA DE FINALIZACIÓN:</span>{" "}
          {header.fechaEgreso ? new Date(header.fechaEgreso).toLocaleString() : "_________________"}
        </div>
        <div>
          <span className="font-bold">HOJA N°:</span> _____ DE _____
        </div>
      </div>

      {/* Tabla Principal de Observaciones por Coche */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-black text-xs">
          <thead>
            <tr className="bg-muted text-center">
              <th className="border border-black p-1 w-20">COCHE</th>
              <th className="border border-black p-1 w-24">N° SIMAF</th>
              <th className="border border-black p-1">TAREA REALIZADA</th>
              <th className="border border-black p-1">OBSERVACIONES, NOVEDADES O FALLAS ENCONTRADAS</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila) => (
              <tr key={fila.id} className="h-12">
                <td className="border border-black p-1 text-center font-bold bg-muted/50">{fila.coche}</td>
                <td className="border border-black p-0">
                  <Input
                    type="text"
                    value={fila.simaf}
                    onChange={(e) => onFilaChange(fila.id, "simaf", e.target.value)}
                    className="w-full h-full bg-transparent text-center focus:outline-none rounded-none border-0"
                    placeholder="N° SIMAF"
                  />
                </td>
                <td className="border border-black p-0">
                  <Input
                    type="text"
                    value={fila.tarea}
                    onChange={(e) => onFilaChange(fila.id, "tarea", e.target.value)}
                    className="w-full h-full bg-transparent px-1 focus:outline-none rounded-none border-0"
                    placeholder="Tarea realizada"
                  />
                </td>
                <td className="border border-black p-0">
                  <Input
                    type="text"
                    value={fila.observacion}
                    onChange={(e) => onFilaChange(fila.id, "observacion", e.target.value)}
                    className="w-full h-full bg-transparent px-1 focus:outline-none rounded-none border-0"
                    placeholder="Describir trabajo extra (Ej: Cambio de BCH, interfaz de salones...)"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
