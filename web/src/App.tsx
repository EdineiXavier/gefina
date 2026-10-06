import type { Invoice } from "./invoiceType.ts"
import InvoiceTable from './InvoiceTable.tsx'
import { useState, useEffect } from "react";

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

export default function App() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getInvoices() {
      try {
        const response = await fetch('/api/invoices');

        if(!response.ok){
          setError('Não foi possível carregar faturas')
        }

        const datas = await response.json()
        setInvoices(datas)
      } catch {
        setError('Não foi possivel carregar faturas')
      }

      setLoading(false)
    } 

    getInvoices()
  }, [])

  if (loading) return <p>Carregando faturas</p>
  if(error) return <p>{error}</p>

  return <InvoiceTable invoices={invoices} />
}