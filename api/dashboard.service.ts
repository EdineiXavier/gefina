import pool from './database.ts';
import { type Invoice, type InvoiceStatus, findRecentInvoices, findOverdueInvoices } from './invoice.service.ts'

async function sumAmountByStatus(status: InvoiceStatus): Promise<number> {
    const connect = await pool.query(
        'SELECT COALESCE(SUM(amount), 0)::int AS total FROM invoices WHERE status = $1;', 
        [status]
    );
    return connect.rows[0].total;
}

type Resource = 'invoices' | 'customers';

async function count(resource: Resource): Promise<number> {
    const connect = await pool.query(
        `SELECT COUNT(*)::int AS total FROM ${resource};`
    );

    return connect.rows[0].total;
}

interface DashboardTotals { 
    paid: number;
    pending: number;
    invoiceCount: number;
    customerCount: number;
}

interface Dashboard {
    totals: DashboardTotals;
    recentInvoices: Invoice[];
    overdueInvoices: Invoice[];
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
    count('invoices'),
    count('customers'),
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