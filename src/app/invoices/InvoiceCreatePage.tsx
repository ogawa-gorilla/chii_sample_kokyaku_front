'use client';

import { useAppSelector } from "@/hooks";
import { Container } from "react-bootstrap";
import { InvoiceCreateForm } from "./components/InvoiceCreateForm";

export const InvoiceCreatePage = () => {
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
            <span className="navbar-brand mb-0 h5">請求書作成</span>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceCreateForm invoice={invoice!} onSubmit={() => {}}/>
      </Container>
    </div>
  );
};
