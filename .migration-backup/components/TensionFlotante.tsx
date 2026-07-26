import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { ItemEntry } from "@/lib/store"

interface Props {
  code: string
  entry: ItemEntry | undefined
  setField: (code: string, field: keyof ItemEntry, value: string) => void
}

export function TensionFlotante({ code, entry, setField }: Props) {
  return (
    <div className="flex flex-col gap-4 p-3 mt-2 border rounded-lg">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="tension-tc1-cajon1">Tensión TC1 (Cajón 1)</Label>
          <Input id="tension-tc1-cajon1" value={entry?.tensionFlotanteTC1Cajon1 ?? ""} onChange={(e) => setField(code, "tensionFlotanteTC1Cajon1", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tension-tc1-cajon2">Tensión TC1 (Cajón 2)</Label>
          <Input id="tension-tc1-cajon2" value={entry?.tensionFlotanteTC1Cajon2 ?? ""} onChange={(e) => setField(code, "tensionFlotanteTC1Cajon2", e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label htmlFor="tension-tc2-cajon1">Tensión TC2 (Cajón 1)</Label>
          <Input id="tension-tc2-cajon1" value={entry?.tensionFlotanteTC2Cajon1 ?? ""} onChange={(e) => setField(code, "tensionFlotanteTC2Cajon1", e.target.value)} />
        </div>
        <div>
          <Label htmlFor="tension-tc2-cajon2">Tensión TC2 (Cajón 2)</Label>
          <Input id="tension-tc2-cajon2" value={entry?.tensionFlotanteTC2Cajon2 ?? ""} onChange={(e) => setField(code, "tensionFlotanteTC2Cajon2", e.target.value)} />
        </div>
      </div>
    </div>
  )
}
