export interface Invoice {
  id: number;
  customerId: string;
  customerName: string;
  company: string;
  date: string;
  amount: number;
  status: InvoiceStatus;
  invoiceNumber: string;
}

export const InvoiceStatus = {
  PAID:  '支払い済み',
  UNPAID: '未払い',
} as const;

export type InvoiceStatus = typeof InvoiceStatus[keyof typeof InvoiceStatus];

