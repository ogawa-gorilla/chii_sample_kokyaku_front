'use client';

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentPage } from "@/store/navigationSlice";
import { Page } from "@/types/page";
import { Button, Container } from "react-bootstrap";
import { InvoiceDetailCard } from "./components/InvoiceDetailCard";

export const InvoiceDetailPage = () => {
  const dispatch = useAppDispatch();
  const selectedInvoiceId = useAppSelector(state => state.invoice.selectedInvoiceId);
  const invoice = useAppSelector(state => 
    state.invoice.invoices.find(c => c.id === selectedInvoiceId)
  );

  if (!invoice) {
    return (
      <Container className="mt-4">
        <div>請求書が見つかりませんでした。</div>
      </Container>
    );
  }
  return (
    <div>
      <style>
        {`
        .main-content {
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 80px; /* フッターの高さ分 */
        }
        `}
      </style>
      <div className="fixed-header-container">
          <nav className="navbar">
            <Button variant="primary" size="sm" onClick={() => dispatch(setCurrentPage(Page.invoiceList))}>
              ← 戻る
            </Button>
            <span className="navbar-brand mb-0 h5">請求書詳細</span>
            <Button size="sm" variant="primary">編集</Button>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceDetailCard invoice={invoice}/>
      </Container>
    </div>
  );
};
