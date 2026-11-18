import { useEffect, useState } from 'react';
import type { Dashboard } from './dashboardType.ts';
import InvoiceSummaryTable from './InvoiceSummaryTable.tsx';
import SummaryCard from './SummaryCard.tsx';
import { formatCurrency } from './utils.ts';

// const invoices: Invoice[] = [
//   {
//     id: 1,
//     amount: 125000,
//     status: 'pending',
//     issueDate: '2026-06-01',
//     dueDate: '2026-06-15',
//     customer: {
//       id: 1,
//       name: 'Construtora Meridiano',
//       email: 'contato@meridiano.com.br'
//     }
//   },
//   {
//     id: 2,
//     amount: 348000,
//     status: 'paid',
//     issueDate: '2026-05-12',
//     dueDate: '2026-06-11',
//     customer: {
//       id: 1,
//       name: 'Construtora Meridiano',
//       email: 'contato@meridiano.com.br'
//     }
//   },
//   {
//     id: 3,
//     amount: 96500,
//     status: 'pending',
//     issueDate: '2026-06-20',
//     dueDate: '2026-07-20',
//     customer: {
//       id: 2,
//       name: 'Gráfica Aurora',
//       email: 'contato@graficaaurora.com.br'
//     }
//   }
// ];

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState<null | Dashboard>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboard() {
      try {
        const response = await fetch('/api/dashboard');

        if (!response.ok) {
          setError('Não foi possível carregar faturas');
          setLoading(false);
          return;
        }

        const datas = await response.json();
        setDashboard(datas);
      } catch {
        setError('Não foi possivel carregar faturas');
      }

      setLoading(false);
    }

    getDashboard();
  }, []);

  if (loading) return <p className='text-sm text-text-muted'>Carregando painel inicial...</p>;

  // if (loading) return <p>Carregando faturas...</p>
  if (error || dashboard === null) return <p className='text-overdue'>{error}</p>;

  return (
    <>
      <h1 className='text-xl font-semibold mb-7'>Painel Inicial</h1>

      <div className='flex gap-4'>
        <SummaryCard
          label="Total recebido:"
          value={formatCurrency(dashboard.totals.paid)}
        />
        <SummaryCard
          label="Total pendente:"
          value={formatCurrency(dashboard.totals.pending)}
        />
        <SummaryCard
          label="Faturas:"
          value={String(dashboard.totals.invoiceCount)}
        />
        <SummaryCard
          label="Clientes:"
          value={String(dashboard.totals.customerCount)}
        />
      </div>

      <div className='flex gap-6 mt-8'>
        <InvoiceSummaryTable
          title="Faturas recentes"
          dateLabel="Emissão"
          invoices={dashboard.recentInvoices}
          date={(invoice) => invoice.issueDate}
        />

        <InvoiceSummaryTable
          title="Faturas atrasadas"
          dateLabel="Vencimento"
          invoices={dashboard.overdueInvoices}
          date={(invoice) => invoice.dueDate}
        />
      </div>

      <small className='fixed bottom-0 left-[calc(50%+120px)] -translate-x-1/2'>&copy; 2026. Gefina - Gestor financeiro simples e eficiente</small>
    </>
  );
}

// vite build: cria o processo de building. O navegador nao entende ts. O build gera os arquivos que sao rodados dentro do servidor online
