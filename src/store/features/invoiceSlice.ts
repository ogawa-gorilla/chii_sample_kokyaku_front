import { createSlice } from "@reduxjs/toolkit";
import { Invoice, InvoiceStatus } from "../../types/invoice";

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [
    {
      id: 1,
      customerId: '1', // 山田 太郎 - 丸紅建設株式会社
      customerName: '山田 太郎',
      company: '丸紅建設株式会社',
      date: '2024/03/15',
      amount: 250000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240315-001',
    },
    {
      id: 2,
      customerId: '2', // 鈴木 花子 - 東和システム株式会社
      customerName: '鈴木 花子',
      company: '東和システム株式会社',
      date: '2024/03/18',
      amount: 180000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240318-001',
    },
    {
      id: 3,
      customerId: '3', // 佐藤 一郎 - 東和システム株式会社
      customerName: '佐藤 一郎',
      company: '東和システム株式会社',
      date: '2024/03/20',
      amount: 320000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240320-001',
    },
    {
      id: 4,
      customerId: '4', // 田中 美咲 - 大和物産株式会社
      customerName: '田中 美咲',
      company: '大和物産株式会社',
      date: '2024/03/22',
      amount: 150000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240322-001',
    },
    {
      id: 5,
      customerId: '1', // 山田 太郎 - 丸紅建設株式会社 (2回目)
      customerName: '山田 太郎',
      company: '丸紅建設株式会社',
      date: '2024/03/22',
      amount: 420000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240322-002',
    },
    {
      id: 6,
      customerId: '9', // 中村 大輔 - 日本メディカルサービス株式会社
      customerName: '中村 大輔',
      company: '日本メディカルサービス株式会社',
      date: '2024/03/27',
      amount: 280000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240327-001',
    },
    {
      id: 7,
      customerId: '8', // 小林 さくら - 東和システム株式会社
      customerName: '小林 さくら',
      company: '東和システム株式会社',
      date: '2024/03/28',
      amount: 195000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240328-001',
    },
    {
      id: 8,
      customerId: '10', // 加藤 優子 - 大和物産株式会社
      customerName: '加藤 優子',
      company: '大和物産株式会社',
      date: '2024/03/29',
      amount: 230000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240329-001',
    },
    {
      id: 9,
      customerId: '11', // 木村 雄二 - テクノソリューション株式会社 (新規)
      customerName: '木村 雄二',
      company: 'テクノソリューション株式会社',
      date: '2024/03/30',
      amount: 380000,
      status: InvoiceStatus.UNPAID,
      invoiceNumber: '240330-001',
    },
    {
      id: 10,
      customerId: '12', // 松本 理恵 - グローバルトレード株式会社 (新規)
      customerName: '松本 理恵',
      company: 'グローバルトレード株式会社',
      date: '2024/03/31',
      amount: 290000,
      status: InvoiceStatus.PAID,
      invoiceNumber: '240331-001',
    }
  ]
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {}
})

export const { } = invoiceSlice.actions;

export default invoiceSlice.reducer;
