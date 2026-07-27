import type { LucideIcon } from "lucide-react"
import { Zap, Wrench, Hammer, GaugeCircle, Droplets, BatteryCharging, HardHat } from "lucide-react"

export type OficioId =
  | "electrico"
  | "mecanico"
  | "carpintero"
  | "cabinero"
  | "aceitero"
  | "baterologo"
  | "operario"

export interface Oficio {
  id: OficioId
  label: string
  short: string
  icon: LucideIcon
}

export const OFICIOS: Oficio[] = [
  { id: "electrico", label: "Oficiales Eléctricos", short: "Eléctrico", icon: Zap },
  { id: "mecanico", label: "Oficiales Mecánicos", short: "Mecánico", icon: Wrench },
  { id: "carpintero", label: "Carpinteros", short: "Carpintero", icon: Hammer },
  { id: "cabinero", label: "Cabineros", short: "Cabinero", icon: GaugeCircle },
  { id: "aceitero", label: "Aceitero", short: "Aceitero", icon: Droplets },
  { id: "baterologo", label: "Baterólogo", short: "Baterólogo", icon: BatteryCharging },
  { id: "operario", label: "Operarios", short: "Operario", icon: HardHat },
]

export const OFICIOS_MAP: Record<OficioId, Oficio> = OFICIOS.reduce(
  (acc, o) => {
    acc[o.id] = o
    return acc
  },
  {} as Record<OficioId, Oficio>,
)
