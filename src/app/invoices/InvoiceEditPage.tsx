'use client';

import { useAppSelector } from "@/hooks";
import { Container } from "react-bootstrap";
import { InvoiceEditForm } from "./components/InvoiceEditForm";

export const InvoiceEditPage = () => {
  const selectedInvoiceId = useAppSelector(state => state.invoice.selectedInvoiceId);
  const invoice = useAppSelector(state => 
    state.invoice.invoices.find(c => c.id === selectedInvoiceId)
  );

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
            <span className="navbar-brand mb-0 h5">請求書編集</span>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceEditForm invoice={invoice!} onSubmit={() => {}}/>
      </Container>
    </div>
  );
};
