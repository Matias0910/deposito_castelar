import { MantenimientoApp } from '../artifacts/deposito-castelar/src/components/mantenimiento-app';

export function PlanillasPage() {
  return (
    <main className="container mx-auto p-4">
      <MantenimientoApp initialOficio="todos" lockOficio={false} />
    </main>
  );
}