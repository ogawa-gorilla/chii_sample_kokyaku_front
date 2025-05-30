import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../../types/customer';

interface CustomerState {
  customers: Customer[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCustomerId: string;
}

const initialState: CustomerState = {
  customers: [
    {
      id: '1',
      name: '山田 太郎',
      phoneNumber: '090-1234-5678',
      company: '丸紅建設株式会社',
      createdAt: '2024-01-01T09:00:00Z',
      updatedAt: '2024-01-01T09:00:00Z',
    },
    {
      id: '2',
      name: '鈴木 花子',
      phoneNumber: '090-2345-6789',
      company: '東和システム株式会社',
      createdAt: '2024-01-02T10:30:00Z',
      updatedAt: '2024-01-02T10:30:00Z',
    },
    {
      id: '3',
      name: '佐藤 一郎',
      phoneNumber: '090-3456-7890',
      company: '東和システム株式会社',
      createdAt: '2024-01-03T11:15:00Z',
      updatedAt: '2024-01-03T11:15:00Z',
    },
    {
      id: '4',
      name: '田中 美咲',
      phoneNumber: '090-4567-8901',
      company: '大和物産株式会社',
      createdAt: '2024-01-04T13:45:00Z',
      updatedAt: '2024-01-04T13:45:00Z',
    },
    {
      id: '5',
      name: '伊藤 健一',
      phoneNumber: '090-5678-9012',
      company: '日本メディカルサービス株式会社',
      createdAt: '2024-01-05T14:20:00Z',
      updatedAt: '2024-01-05T14:20:00Z',
    },
    {
      id: '6',
      name: '渡辺 真理',
      phoneNumber: '090-6789-0123',
      company: '丸紅建設株式会社',
      createdAt: '2024-01-06T15:10:00Z',
      updatedAt: '2024-01-06T15:10:00Z',
    },
    {
      id: '7',
      name: '高橋 誠',
      phoneNumber: '090-7890-1234',
      company: '関西エネルギー株式会社',
      createdAt: '2024-01-07T16:30:00Z',
      updatedAt: '2024-01-07T16:30:00Z',
    },
    {
      id: '8',
      name: '小林 さくら',
      phoneNumber: '090-8901-2345',
      company: '東和システム株式会社',
      createdAt: '2024-01-08T17:00:00Z',
      updatedAt: '2024-01-08T17:00:00Z',
    },
    {
      id: '9',
      name: '中村 大輔',
      phoneNumber: '090-9012-3456',
      company: '日本メディカルサービス株式会社',
      createdAt: '2024-01-09T09:45:00Z',
      updatedAt: '2024-01-09T09:45:00Z',
    },
    {
      id: '10',
      name: '加藤 優子',
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
    }
  },
});

export const {
  setSearchQuery,
  setSelectedCustomer,
} = customerSlice.actions;

export const selectFilteredCustomers = (state: { customer: CustomerState }) => {
  const query = state.customer.searchQuery.toLowerCase();
  if (!query) return state.customer.customers;
  
  return state.customer.customers.filter(customer => 
    customer.name.toLowerCase().includes(query) ||
    (customer.company && customer.company.toLowerCase().includes(query))
  );
};

export const getSelectedCustomer = (state: { customer: CustomerState }): Customer | undefined => {
  return state.customer.customers.find(customer => customer.id === state.customer.selectedCustomerId);
};

export default customerSlice.reducer; 