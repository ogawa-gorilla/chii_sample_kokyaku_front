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

  const handleEdit = () => {
    // TODO: 編集機能の実装
  };

  const handleDelete = () => {
    // TODO: 削除機能の実装
    console.log('削除処理を実装予定');
  };

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
        .action-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: white;
          padding: 1rem;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          margin-bottom: 60px;
        }
        .action-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .action-button {
          width: 100%;
          padding: 0.8rem;
        }
        .delete-button {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .delete-button:hover {
          background-color: #c82333;
          border-color: #bd2130;
        }
        `}
      </style>
      <div className="fixed-header-container">
          <nav className="navbar">
            <Button variant="primary" size="sm" onClick={() => dispatch(setCurrentPage(Page.invoiceList))}>
              ← 一覧へ
            </Button>
            <span className="navbar-brand mb-0 h5">請求書詳細</span>
            <span></span>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceDetailCard invoice={invoice}/>
      </Container>
      <div className="action-bar">
        <Container>
          <div className="action-buttons">
            <Button 
              variant="primary"
              className="action-button"
              onClick={handleEdit}
            >
              編集
            </Button>
            <Button 
              variant="danger"
              className="action-button delete-button"
              onClick={handleDelete}
            >
              削除
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
};
