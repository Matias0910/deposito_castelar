import type { ItemEntry } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface AnexoBateriasProps {
  code: string
  entry: ItemEntry
  setField: (code: string, field: keyof ItemEntry, value: any) => void
}

const ACUMULADORES = ["Acumulador 1 TC1", "Acumulador 2 TC1", "Acumulador 1 TC2", "Acumulador 2 TC2"]
const FILAS = [1, 2, 3, 4, 5]
const COLUMNAS = [1, 2, 3, 4, 5]

export function AnexoBaterias({ code, entry, setField }: AnexoBateriasProps) {
  const handleChange = (acumuladorId: string, fila: number, col: number, value: string) => {
    const currentAnexoData = entry.anexoBaterias ?? {}
    const nextAnexoData = {
      ...currentAnexoData,
      [acumuladorId]: {
        ...currentAnexoData[acumuladorId],
        [`${fila}-${col}`]: value,
      },
    }
    setField(code, "anexoBaterias", nextAnexoData)
  }

  return (
    <div className="mt-4 space-y-8">
      <h4 className="text-sm font-bold text-foreground">ANEXO 3 (Tabla para medición de baterías)</h4>
      {ACUMULADORES.map((acumulador) => {
        const acumuladorId = acumulador.replace(/\s/g, "-")
        return (
          <div key={acumuladorId}>
            <Label className="font-semibold">
              Valores de tensión de cada elemento del {acumulador} (1,9V &lt; Tensión &lt; 2,4V) o (11,4V &lt; Tensión
              &lt; 14,4V)
            </Label>
            <div className="mt-2 overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">FILA / COL</TableHead>
                    {COLUMNAS.map((col) => (
                      <TableHead key={col} className="text-center">
                        {col}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {FILAS.map((fila) => (
                    <TableRow key={fila}>
                      <TableHead className="font-medium">{fila}</TableHead>
                      {COLUMNAS.map((col) => (
                        <TableCell key={col}>
                          <Input
                            type="text"
                            className="min-w-[60px] text-center"
                            value={entry.anexoBaterias?.[acumuladorId]?.[`${fila}-${col}`] ?? ""}
                            onChange={(e) => handleChange(acumuladorId, fila, col, e.target.value)}
                          />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )
      })}
    </div>
  )
}
