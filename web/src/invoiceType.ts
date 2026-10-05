export type InvoiceStatus = 'pending' | 'paid'; // "atrasado vai ser um dado derivado da data atual"

interface Customer {
  id: number;
  name: string;
  email: string;
}

export interface Invoice {
  id: number;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  customer: Customer;
}