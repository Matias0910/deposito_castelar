/// <reference types="vite/client" />
import { useState } from 'react';
import { MantenimientoApp } from '@/components/mantenimiento-app';
import type { OficioId } from "@/lib/oficios"; // o la ruta relativa correcta hacia oficios
import { Wrench, Lock, Zap, Hammer, Shield, Droplets, Battery, HardHat, ShieldCheck } from "lucide-react";

const OFICIOS_LOGIN = [
  { id: "todos", label: "Administración / Ver Todos (Programador)", icon: ShieldCheck, isAdmin: true, pin: import.meta.env.REACT_APP_PIN_ADMIN || "0910" },
  { id: "electrico", label: "Eléctrico", icon: Zap, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_ELECTRICO || "2701" },
  { id: "mecanico", label: "Mecánico", icon: Wrench, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_MECANICO || "0108" },
  { id: "carpintero", label: "Carpintero", icon: Hammer, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_CARPINTERO || "1511" },
  { id: "cabinero", label: "Cabinero", icon: Shield, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_CABINERO || "4444" },
  { id: "aceitero", label: "Aceitero", icon: Droplets, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_ACEITERO || "1414" },
  { id: "baterologo", label: "Baterólogo", icon: Battery, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_BATEROLOGO || "0910" },
  { id: "operario", label: "Operario", icon: HardHat, isAdmin: false, pin: import.meta.env.REACT_APP_PIN_OPERARIO || "2424" },
];

export function LoginApp({ onLogin }: { onLogin: (oficioId: string, isSuperAdmin: boolean) => void }) {
  const [selectedId, setSelectedId] = useState("");
  const [pin, setPin] = useState("");

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selected = OFICIOS_LOGIN.find(o => o.id === selectedId);
    
    if (!selected) {
      alert("Por favor selecciona un perfil.");
      return;
    }

    // Validar el PIN para el perfil seleccionado
    if (pin !== selected.pin) {
      alert("PIN incorrecto.");
      return;
    }

    onLogin(selected.id, selected.isAdmin);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <span className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2">
            <Lock className="size-6" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight">Depósito Castelar</h1>
          <p className="text-sm text-muted-foreground">Iniciá sesión según tu rol u oficio</p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Perfil / Oficio</label>
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">-- Seleccionar Perfil --</option>
              {OFICIOS_LOGIN.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">PIN de Acceso</label>
            <input
              type="password"
              placeholder="••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ingresar al Sistema
          </button>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState<{ oficio: string; isAdmin: boolean } | null>(null);

  if (!session) {
    return <LoginApp onLogin={(oficio, isAdmin) => setSession({ oficio, isAdmin })} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <MantenimientoApp 
        initialOficio={session.oficio as OficioId | "todos"}
        lockOficio={!session.isAdmin} // Si no sos admin, bloquea el cambio de oficio
      />
    </div>
  );
}
