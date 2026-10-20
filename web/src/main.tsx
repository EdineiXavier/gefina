import { createRoot } from 'react-dom/client';
import App from './App.tsx'
import InvoicePage from './InvoicePage.tsx'

const root = document.querySelector('div');

if(root !== null) createRoot(root).render(<App/>);