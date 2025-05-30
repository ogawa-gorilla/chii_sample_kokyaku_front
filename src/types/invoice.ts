export interface Invoice {
  id: number;
  customerName: string;
  company: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
}

export const InvoiceStatus = {
  PAID:  'paid',
  UNPAID: 'unpaid',
} as const;

export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];

