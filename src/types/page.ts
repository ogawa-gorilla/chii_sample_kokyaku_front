export const Page = {
  customerList: 'customerList',
  customerDetail: 'customerDetail',
  customerCreate: 'customerCreate',
  invoiceList: 'invoiceList',
  invoiceDetail: 'invoiceDetail',
  invoiceCreate: 'invoiceCreate',
  invoiceEdit: 'invoiceEdit',
  help: 'help',
} as const;

export type Page = typeof Page[keyof typeof Page];
