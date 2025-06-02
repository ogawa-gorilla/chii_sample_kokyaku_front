import { Customer, CustomerSortOrder } from '@/types/customer';
import { normalizeForSearch } from '@/utils/japanese';
import { generateUUID } from '@/utils/uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCustomerId: string;
  editing: boolean;
  draftCustomer: Customer | null;
  sortOrder: CustomerSortOrder;
}

const initialState: CustomerState = {
  customers: [
    {
      id: '1',
      name: '山田 太郎',
      nameReading: 'ヤマダ タロウ',
      phoneNumber: '090-1234-5678',
      company: '丸紅建設株式会社',
      createdAt: '2024-01-01T09:00:00Z',
      updatedAt: '2024-01-01T09:00:00Z',
    },
    {
      id: '2',
      name: '鈴木 花子',
      nameReading: 'スズキ ハナコ',
      phoneNumber: '090-2345-6789',
      company: '東和システム株式会社',
      createdAt: '2024-01-02T10:30:00Z',
      updatedAt: '2024-01-02T10:30:00Z',
    },
    {
      id: '3',
      name: '佐藤 一郎',
      nameReading: 'サトウ イチロウ',
      phoneNumber: '090-3456-7890',
      company: '東和システム株式会社',
      createdAt: '2024-01-03T11:15:00Z',
      updatedAt: '2024-01-03T11:15:00Z',
    },
    {
      id: '4',
      name: '田中 美咲',
      nameReading: 'タナカ ミサキ',
      phoneNumber: '090-4567-8901',
      company: '大和物産株式会社',
      createdAt: '2024-01-04T13:45:00Z',
      updatedAt: '2024-01-04T13:45:00Z',
    },
    {
      id: '5',
      name: '伊藤 健一',
      nameReading: 'イトウ ケンイチ',
      phoneNumber: '090-5678-9012',
      company: '日本メディカルサービス株式会社',
      createdAt: '2024-01-05T14:20:00Z',
      updatedAt: '2024-01-05T14:20:00Z',
    },
    {
      id: '6',
      name: '渡辺 真理',
      nameReading: 'ワタナベ マリ',
      phoneNumber: '090-6789-0123',
      company: '丸紅建設株式会社',
      createdAt: '2024-01-06T15:10:00Z',
      updatedAt: '2024-01-06T15:10:00Z',
    },
    {
      id: '7',
      name: '高橋 誠',
      nameReading: 'タカハシ マコト',
      phoneNumber: '090-7890-1234',
      company: '関西エネルギー株式会社',
      createdAt: '2024-01-07T16:30:00Z',
      updatedAt: '2024-01-07T16:30:00Z',
    },
    {
      id: '8',
      name: '小林 さくら',
      nameReading: 'コバヤシ サクラ',
      phoneNumber: '090-8901-2345',
      company: '東和システム株式会社',
      createdAt: '2024-01-08T17:00:00Z',
      updatedAt: '2024-01-08T17:00:00Z',
    },
    {
      id: '9',
      name: '中村 大輔',
      nameReading: 'ナカムラ ダイスケ',
      phoneNumber: '090-9012-3456',
      company: '日本メディカルサービス株式会社',
      createdAt: '2024-01-09T09:45:00Z',
      updatedAt: '2024-01-09T09:45:00Z',
    },
    {
      id: '10',
      name: '加藤 優子',
      nameReading: 'カトウ ユウコ',
      phoneNumber: '090-0123-4567',
      company: '大和物産株式会社',
      createdAt: '2024-01-10T10:15:00Z',
      updatedAt: '2024-01-10T10:15:00Z',
    }
  ],
  loading: false,
  error: null,
  searchQuery: '',
  selectedCustomerId: '',
  editing: false,
  draftCustomer: null,
  sortOrder: 'updatedAt_desc',
};

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCustomer: (state, action: PayloadAction<string>) => {
      state.selectedCustomerId = action.payload;
      state.editing = false;
      state.draftCustomer = null;
    },
    deleteCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(customer => customer.id !== action.payload);
      state.selectedCustomerId = '';
      state.editing = false;
      state.draftCustomer = null;
    },
    startEditing: (state) => {
      const customer = state.customers.find(c => c.id === state.selectedCustomerId);
      if (customer) {
        state.draftCustomer = { ...customer };
        state.editing = true;
      }
    },
    cancelEditing: (state) => {
      state.editing = false;
      state.draftCustomer = null;
    },
    updateDraft: (state, action: PayloadAction<Partial<Customer>>) => {
      if (state.draftCustomer) {
        state.draftCustomer = {
          ...state.draftCustomer,
          ...action.payload
        };
      }
    },
    startNewCustomer: (state) => {
      const now = new Date().toISOString();
      state.draftCustomer = {
        id: generateUUID(),
        name: '',
        nameReading: '',
        phoneNumber: '',
        company: '',
        createdAt: now,
        updatedAt: now,
      };
      state.editing = true;
      state.selectedCustomerId = '';
    },
    saveDraft: (state) => {
      if (state.draftCustomer) {
        const now = new Date().toISOString();
        const updatedCustomer = {
          ...state.draftCustomer,
          updatedAt: now
        };

        const index = state.customers.findIndex(c => c.id === state.draftCustomer!.id);
        if (index !== -1) {
          state.customers[index] = updatedCustomer;
        } else {
          state.customers.push(updatedCustomer);
        }
        state.selectedCustomerId = updatedCustomer.id;
        state.editing = false;
        state.draftCustomer = null;
      }
    },
    setSortOrder: (state, action: PayloadAction<CustomerSortOrder>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCustomer,
  deleteCustomer,
  startEditing,
  cancelEditing,
  updateDraft,
  saveDraft,
  startNewCustomer,
  setSortOrder
} = customerSlice.actions;

const sortCustomers = (customers: Customer[], sortOrder: CustomerSortOrder): Customer[] => {
  const sorted = [...customers];
  
  switch (sortOrder) {
    case 'updatedAt_desc':
      return sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    case 'updatedAt_asc':
      return sorted.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
    case 'name_asc':
      return sorted.sort((a, b) => a.nameReading.localeCompare(b.nameReading, 'ja'));
    case 'name_desc':
      return sorted.sort((a, b) => b.nameReading.localeCompare(a.nameReading, 'ja'));
    case 'company':
      return sorted.sort((a, b) => (a.company || '').localeCompare(b.company || '', 'ja'));
    default:
      return sorted;
  }
};

const selectCustomers = (state: { customer: CustomerState }) => state.customer.customers;
const selectSearchQuery = (state: { customer: CustomerState }) => state.customer.searchQuery;
const selectSortOrder = (state: { customer: CustomerState }) => state.customer.sortOrder;

export const selectFilteredCustomers = createSelector(
  [selectCustomers, selectSearchQuery, selectSortOrder],
  (customers, query, sortOrder) => {
    const readingQuery = normalizeForSearch(query);
    
    let filteredCustomers = customers;
    
    // 検索フィルタリングを適用
    if (query) {
      filteredCustomers = filteredCustomers.filter(customer => 
        customer.name.includes(query) ||
        normalizeForSearch(customer.nameReading).includes(readingQuery) ||
        (customer.company && customer.company.includes(query))
      );
    }
    
    // ソート順を適用
    return sortCustomers(filteredCustomers, sortOrder);
  }
);

export const getSelectedCustomer = (state: { customer: CustomerState }): Customer | undefined => {
  return state.customer.customers.find(customer => customer.id === state.customer.selectedCustomerId);
};

export default customerSlice.reducer; 