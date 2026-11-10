import prisma from './prisma.ts';
import { type Invoice, findRecentInvoices, findOverdueInvoices } from './invoice.service.ts'
import type { InvoiceStatus } from './invoice.schema.ts';

interface Dashboard {
  totals: {
    paid: number;
    pending: number;
    invoiceCount: number;
    customerCount: number;
  }
  recentInvoices: Invoice[];
  overdueInvoices: Invoice[];
}

async function sumAmountByStatus(status: InvoiceStatus): Promise<number> {
  const sum = await prisma.invoice.aggregate({
    where: { status },
    _sum: { amount: true }
  });

  return !sum._sum.amount ? 0 : sum._sum.amount
}



export default async function findDashboard(): Promise<Dashboard> {
  const [
    paid,
    pending,
    invoiceCount,
    customerCount,
    recentInvoices,
    overdueInvoices
  ] = await Promise.all([
    sumAmountByStatus('paid'),
    sumAmountByStatus('pending'),
    prisma.invoice.count(),
    prisma.customer.count(),
    findRecentInvoices(),
    findOverdueInvoices()
  ]);

  return {
    totals: {
      paid,
      pending,
      invoiceCount,
      customerCount
    },
    recentInvoices,
    overdueInvoices
  };
}


// SELECT COALESCE(SUM(amount), 0)::int AS total FROM invoices WHERE status = 'pending'