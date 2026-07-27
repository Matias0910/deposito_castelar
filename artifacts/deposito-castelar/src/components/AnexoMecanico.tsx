import type { ItemEntry } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AnexoMecanicoProps {
  code: string
  entry: ItemEntry
  setField: (code: string, field: keyof ItemEntry, value: any) => void
}

const COCHES = ["TC-1", "M1-1", "M2-1", "T3", "M1-2", "M2-2", "M3", "M4", "TC-2"]

const TABLAS = [
  {
    id: "balona",
    titulo: "BALONA FISURADA (Marcar con una cruz los elementos dañados)",
    filas: ["BOGIE 1 - NORTE", "BOGIE 1 - SUR", "BOGIE 2 - NORTE", "BOGIE 2 - SUR"],
    type: "text",
  },
  {
    id: "amortiguadorVertical",
    titulo: "AMORTIGUADOR VERTICAL (Marcar con una cruz los elementos dañados)",
    filas: ["B1 L/N E1", "B1 L/N E2", "B1 L/S E1", "B1 L/S E2", "B2 L/N E3", "B2 L/N E4", "B2 L/S E3", "B2 L/S E4"],
    type: "text",
  },
  {
    id: "amortiguadorTransversal",
    titulo: "AMORTIGUADOR TRANSVERSAL (Marcar con una cruz los elementos dañados)",
    filas: ["BOGIE 1 - NORTE", "BOGIE 1 - SUR", "BOGIE 2 - NORTE", "BOGIE 2 - SUR"],
    type: "text",
  },
  {
    id: "lubricador",
    titulo: "LUBRICADOR DE PESTAÑA (Anotar cantidad de elementos agregados)",
    filas: ["BOGIE 1 - NORTE", "BOGIE 1 - SUR", "BOGIE 2 - NORTE", "BOGIE 2 - SUR"],
    type: "number",
  },
  {
    id: "pastilla",
    titulo: "PASTILLA REEMPLAZADA (Marcar con una cruz los elementos dañados)",
    filas: ["BOGIE 1 - NORTE", "BOGIE 1 - SUR", "BOGIE 2 - NORTE", "BOGIE 2 - SUR"],
    type: "text",
  },
]

export function AnexoMecanico({ code, entry, setField }: AnexoMecanicoProps) {
  const handleChange = (tablaId: string, fila: string, coche: string, value: string) => {
    const currentAnexoData = entry.anexoMecanico ?? {}
    const nextAnexoData = {
      ...currentAnexoData,
      [tablaId]: {
        ...currentAnexoData[tablaId],
        [`${fila}-${coche}`]: value,
      },
    }
    setField(code, "anexoMecanico", nextAnexoData)
  }

  return (
    <div className="mt-4 space-y-8">
      {TABLAS.map((tabla) => (
        <div key={tabla.id}>
          <Label className="font-semibold">{tabla.titulo}</Label>
          <div className="mt-2 overflow-x-auto rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[150px]"></TableHead>
                  {COCHES.map((coche) => (
                    <TableHead key={coche} className="text-center">
                      {coche}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {tabla.filas.map((fila) => (
                  <TableRow key={fila}>
                    <TableHead className="font-medium">{fila}</TableHead>
                    {COCHES.map((coche) => (
                      <TableCell key={coche}>
                        <Input
                          type={tabla.type}
                          className="min-w-[60px] text-center"
                          value={entry.anexoMecanico?.[tabla.id]?.[`${fila}-${coche}`] ?? ""}
                          onChange={(e) => handleChange(tabla.id, fila, coche, e.target.value)}
                        />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  )
}
