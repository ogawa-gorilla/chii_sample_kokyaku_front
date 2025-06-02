export const Page = {
  home: 'home',
  customerList: 'customerList',
  customerDetail: 'customerDetail',
  invoiceList: 'invoiceList',
  invoiceDetail: 'invoiceDetail',
  invoiceEdit: 'invoiceEdit'
} as const;

export type Page = typeof Page[keyof typeof Page];
