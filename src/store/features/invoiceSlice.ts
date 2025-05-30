import { createSlice } from "@reduxjs/toolkit";
import { Invoice, InvoiceStatus } from "../../types/invoice";

interface InvoiceState {
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  invoices: [
    {
      id: 1,
      customerName: '山田 太郎',
      company: '株式会社サンプル',
      date: '2025/05/20',
      amount: 120000,
      status: InvoiceStatus.PAID,
    }
  ]
}

export const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {}
})

export const { } = invoiceSlice.actions;
