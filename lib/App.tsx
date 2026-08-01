import { BrowserRouter as Router } from 'react-router-dom';
import { MantenimientoApp } from '../artifacts/deposito-castelar/src/components/mantenimiento-app';

export default function App() {
  return (
    <Router>
      <MantenimientoApp initialOficio="todos" lockOficio={false} />
    </Router>
  );
}