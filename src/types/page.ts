export const Page = {
  home: 'home',
  customerList: 'customerList',
  customerDetail: 'customerDetail',
  invoiceList: 'invoiceList',
  invoiceDetail: 'invoiceDetail'
} as const;

export type Page = typeof Page[keyof typeof Page];
