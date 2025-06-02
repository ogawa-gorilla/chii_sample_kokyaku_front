'use client';

import { useAppDispatch } from "@/hooks";
import { createInvoice } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { defaultInvoice, Invoice } from "@/types/invoice";
import { Page } from "@/types/page";
import { generateUUID } from "@/utils/uuid";
import { Container } from "react-bootstrap";
import { InvoiceCreateForm } from "./components/InvoiceCreateForm";
export const InvoiceCreatePage = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = (data: Partial<Invoice>) => {
    const newEntry = { ...defaultInvoice(), ...data, id: generateUUID() };
    dispatch(createInvoice(newEntry));
    dispatch(setCurrentPage(Page.invoiceList));
  }

  return (
    <div>
      <style>
        {`
        .main-content {
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 200px; /* フッターの高さ分 */
        }
        `}
      </style>
      <div className="fixed-header-container">
          <nav className="navbar">
            <span className="navbar-brand mb-0 h5">請求書作成</span>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceCreateForm onSubmit={handleSubmit}/>
      </Container>
    </div>
  );
};
