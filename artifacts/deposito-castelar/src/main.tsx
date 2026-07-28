import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Importamos BrowserRouter

import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> {/* Envolvemos App con BrowserRouter */}
    <App />
  </BrowserRouter>
);
