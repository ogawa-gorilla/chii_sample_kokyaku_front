export const Page = {
  home: 'home',
  customerList: 'customerList',
  customerDetail: 'customerDetail',
  invoiceList: 'invoiceList',
  invoiceDetail: 'invoiceDetail',
  invoiceCreate: 'invoiceCreate',
  invoiceEdit: 'invoiceEdit',
  trash: 'trash'
} as const;

export type Page = typeof Page[keyof typeof Page];
