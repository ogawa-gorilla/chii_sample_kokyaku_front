export interface Customer {
  id: string;
  name: string;
  nameReading: string;
  phoneNumber: string;
  company: string;
  createdAt: string;
  updatedAt: string;
}

export type CustomerSortOrder = 'updatedAt_desc' | 'updatedAt_asc' | 'name_asc' | 'name_desc' | 'company';

export const SORT_ORDER_LABELS: Record<CustomerSortOrder, string> = {
  'updatedAt_desc': '更新日（新しい順）',
  'updatedAt_asc': '更新日（古い順）',
  'name_asc': '名前（あいうえお順）',
  'name_desc': '名前（あいうえお逆順）',
  'company': '会社ごと',
} as const;
