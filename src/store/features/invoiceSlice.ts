import { Invoice, InvoiceStatus } from "@/types/invoice";
import { formatDate } from "@/utils/date";
import { normalizeForSearch } from "@/utils/japanese";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InvoiceState {
  invoices: Invoice[];
  selectedInvoiceId: string | null;
  searchText: string;
  loading: boolean;
  error: string | null;
  showUnpaidOnly: boolean;
  startMonth: string;
  endMonth: string;
  sortOrder: 'asc' | 'desc';
  invoiceDraft: Invoice | null;
  trashedInvoices: Invoice[];
}

const now = new Date().toISOString().split('T')[0].slice(0, 7);

const initialState: InvoiceState = {
  invoices: [
    {
      id: "11",
      customerId: '2', // 鈴木 花子 - 東和システム株式会社
      customerName: '鈴木 花子',
      customerReading: 'スズキ ハナコ',
      company: '東和システム株式会社',
      date: '2024/02/05',
      amount: 220000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240205-001',
    },
    {
      id: "12",
      customerId: '1', // 山田 太郎 - 丸紅建設株式会社
      customerName: '山田 太郎',
      customerReading: 'ヤマダ タロウ',
      company: '丸紅建設株式会社',
      date: '2024/02/10',
      amount: 180000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240210-001',
    },
    {
      id: "13",
      customerId: '4', // 田中 美咲 - 大和物産株式会社
      customerName: '田中 美咲',
      customerReading: 'タナカ ミサキ',
      company: '大和物産株式会社',
      date: '2024/02/15',
      amount: 340000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240215-001',
    },
    {
      id: "14",
      customerId: '9', // 中村 大輔 - 日本メディカルサービス株式会社
      customerName: '中村 大輔',
      customerReading: 'ナカムラ ダイスケ',
      company: '日本メディカルサービス株式会社',
      date: '2024/02/20',
      amount: 260000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240220-001',
    },
    {
      id: "15",
      customerId: '8', // 小林 さくら - 東和システム株式会社
      customerName: '小林 さくら',
      customerReading: 'コバヤシ サクラ',
      company: '東和システム株式会社',
      date: '2024/02/25',
      amount: 190000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240225-001',
    },
    {
      id: "1",
      customerId: '1', // 山田 太郎 - 丸紅建設株式会社
      customerName: '山田 太郎',
      customerReading: 'ヤマダ タロウ',
      company: '丸紅建設株式会社',
      date: '2024/03/15',
      amount: 250000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240315-001',
    },
    {
      id: "2",
      customerId: '2', // 鈴木 花子 - 東和システム株式会社
      customerName: '鈴木 花子',
      customerReading: 'スズキ ハナコ',
      company: '東和システム株式会社',
      date: '2024/03/18',
      amount: 180000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240318-001',
    },
    {
      id: "3",
      customerId: '3', // 佐藤 一郎 - 東和システム株式会社
      customerName: '佐藤 一郎',
      customerReading: 'サトウ イチロウ',
      company: '東和システム株式会社',
      date: '2024/03/20',
      amount: 320000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240320-001',
    },
    {
      id: "4",
      customerId: '4', // 田中 美咲 - 大和物産株式会社
      customerName: '田中 美咲',
      customerReading: 'タナカ ミサキ',
      company: '大和物産株式会社',
      date: '2024/03/22',
      amount: 150000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240322-001',
    },
    {
      id: "5",
      customerId: '1', // 山田 太郎 - 丸紅建設株式会社 (2回目)
      customerName: '山田 太郎',
      customerReading: 'ヤマダ タロウ',
      company: '丸紅建設株式会社',
      date: '2024/03/22',
      amount: 420000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240322-002',
    },
    {
      id: "6",
      customerId: '9', // 中村 大輔 - 日本メディカルサービス株式会社
      customerName: '中村 大輔',
      customerReading: 'ナカムラ ダイスケ',
      company: '日本メディカルサービス株式会社',
      date: '2024/03/27',
      amount: 280000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240327-001',
    },
    {
      id: "8",
      customerId: '10', // 加藤 優子 - 大和物産株式会社
      customerName: '加藤 優子',
      customerReading: 'カトウ ユウコ',
      company: '大和物産株式会社',
      date: '2024/03/31',
      amount: 230000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240331-002',
    },
    {
      id: "9",
      customerId: '11', // 木村 雄二 - テクノソリューション株式会社 (新規)
      customerName: '木村 雄二',
      customerReading: 'キムラ ユウジ',
      company: 'テクノソリューション株式会社',
      date: '2024/03/30',
      amount: 380000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240330-001',
    },
    {
      id: "10",
      customerId: '12', // 松本 理恵 - グローバルトレード株式会社 (新規)
      customerName: '松本 理恵',
      customerReading: 'マツモト リエ',
      company: 'グローバルトレード株式会社',
      date: '2024/03/31',
      amount: 290000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240331-001',
    }
  ],
  selectedInvoiceId: null,
  searchText: "",
  loading: false,
  error: null,
  showUnpaidOnly: false,
  startMonth: "2024-03",
  endMonth: now,
  sortOrder: 'desc',
  invoiceDraft: null,
  trashedInvoices: [
        {
      id: "7",
      customerId: '8', // 小林 さくら - 東和システム株式会社
      customerName: '小林 さくら',
      customerReading: 'コバヤシ サクラ',
      company: '東和システム株式会社',
      date: '2024/03/28',
      amount: 195000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240328-001',
      deletedAt: '2024/03/28 12:02:03',
    },
  ]
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setSelectedInvoice: (state, action: PayloadAction<string>) => {
      state.selectedInvoiceId = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setShowUnpaidOnly: (state, action: PayloadAction<boolean>) => {
      state.showUnpaidOnly = action.payload;
    },
    setStartMonth: (state, action: PayloadAction<string>) => {
      state.startMonth = action.payload;
    },
    setEndMonth: (state, action: PayloadAction<string>) => {
      state.endMonth = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    resetSearchConditions: (state) => {
      const now = new Date().toISOString().split('T')[0].slice(0, 7);
      state.searchText = "";
      state.showUnpaidOnly = false;
      state.startMonth = "2024-03";
      state.endMonth = now;
    },
    startNewInvoice: (state) => { 
      const now = new Date().toISOString().split('T')[0]
      state.invoiceDraft = {
        id: '',
        customerId: '',
        customerName: '',
        customerReading: '',
        company: '',
        date: now,
        amount: 0,
        status: InvoiceStatus.UNPAID,
        invoiceNumber: '',
      }
    },
    updateInvoiceDraft: (state, action: PayloadAction<Partial<Invoice>>) => {
      if (state.invoiceDraft) {
        state.invoiceDraft = { ...state.invoiceDraft, ...action.payload };
      }
    },
    createInvoice: (state, action: PayloadAction<Invoice>) => {
      state.invoices.push(action.payload);
    },
    startEditInvoice: (state, action: PayloadAction<string>) => {
      const invoice = state.invoices.find(invoice => invoice.id === action.payload)!;
      state.invoiceDraft = { ...invoice };
    },
    saveInvoice: (state, action: PayloadAction<Partial<Invoice>>) => {
      const targetIndex = state.invoices.findIndex(invoice => invoice.id === action.payload.id);
      const invoice = state.invoices[targetIndex]
      const editedInvoice = { ...invoice, ...action.payload };
      state.invoices[targetIndex] = editedInvoice;
    },
    trashInvoice: (state, action: PayloadAction<string>) => {
      const targetIndex = state.invoices.findIndex(invoice => invoice.id === action.payload);
      const invoice = { ...state.invoices[targetIndex] , deletedAt: formatDate(new Date()) }
      state.trashedInvoices.push(invoice)
      state.invoices.splice(targetIndex, 1)
    },
    permanentDeleteInvoice: (state, action: PayloadAction<string>) => {
      const targetIndex = state.trashedInvoices.findIndex(invoice => invoice.id === action.payload);
      state.trashedInvoices.splice(targetIndex, 1);
    },
    restoreInvoice: (state, action: PayloadAction<string>) => {
      const targetIndex = state.trashedInvoices.findIndex(invoice => invoice.id === action.payload);
      const invoice = state.trashedInvoices[targetIndex];
      state.invoices.push(invoice);
      state.trashedInvoices.splice(targetIndex, 1);
    }
  }
})

export const { 
  setSelectedInvoice, 
  setSearchText, 
  setShowUnpaidOnly,
  setStartMonth,
  setEndMonth,
  setSortOrder,
  resetSearchConditions,
  startNewInvoice,
  updateInvoiceDraft,
  createInvoice,
  startEditInvoice,
  saveInvoice,
  trashInvoice,
  permanentDeleteInvoice,
  restoreInvoice
} = invoiceSlice.actions;

// セレクター: フィルタリングされた請求書リストを返す
export const selectFilteredInvoices = (state: RootState) => {
  const searchText = state.invoice.searchText.toLowerCase();
  const customerNameReading = normalizeForSearch(state.invoice.searchText);
  const showUnpaidOnly = state.invoice.showUnpaidOnly;
  const startMonth = state.invoice.startMonth;
  const endMonth = state.invoice.endMonth;
  const sortOrder = state.invoice.sortOrder;
  
  let filteredInvoices = state.invoice.invoices;

  // テキスト検索フィルター
  if (searchText) {
    filteredInvoices = filteredInvoices.filter(invoice => 
      invoice.customerName.toLowerCase().includes(searchText) ||
      invoice.customerReading.toLowerCase().includes(customerNameReading) ||
      invoice.company.toLowerCase().includes(searchText) ||
      invoice.invoiceNumber.toLowerCase().includes(searchText)
    );
  }

  // 未払いのみフィルター
  if (showUnpaidOnly) {
    filteredInvoices = filteredInvoices.filter(invoice => 
      invoice.status === InvoiceStatus.UNPAID
    );
  }

  // 日付フィルター
  if (startMonth && endMonth) {
    const startDate = new Date(startMonth + '-01');
    const endDate = new Date(endMonth + '-31'); // 月末まで含める
    
    filteredInvoices = filteredInvoices.filter(invoice => {
      const invoiceDate = new Date(invoice.date.replace('/', '-'));
      return invoiceDate >= startDate && invoiceDate <= endDate;
    });
  }

  // 日付でソート
  filteredInvoices = [...filteredInvoices].sort((a, b) => {
    const dateA = new Date(a.date.replace('/', '-'));
    const dateB = new Date(b.date.replace('/', '-'));
    return sortOrder === 'asc' 
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime();
  });

  return filteredInvoices;
};

export default invoiceSlice.reducer;
