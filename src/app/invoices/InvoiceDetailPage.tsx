'use client';

import { Button, Container } from "react-bootstrap";
import { InvoiceCardList } from "./InvoiceCardList";

export const InvoiceDetailPage = () => {
  return (
    <div>
      <style>
        {`
        .main-content {
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 80px; /* フッターの高さ分 */
        }
        .info-label {
          color: #6c757d;
          font-size: 0.9rem;
        }
        `}
      </style>
      <div className="fixed-header-container">
          <nav className="navbar">
            <span className="navbar-brand mb-0 h5">請求書詳細</span>
            <Button size="sm" variant="primary">編集</Button>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceCardList />
      </Container>
    </div>
  );
};
