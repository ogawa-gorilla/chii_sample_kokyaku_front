'use client';

import { Button, Container } from "react-bootstrap";
import { InvoiceDetailCard } from "./components/InvoiceDetailCard";

export const InvoiceDetailPage = () => {
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
            <span className="navbar-brand mb-0 h5">請求書詳細</span>
            <Button size="sm" variant="primary">編集</Button>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceDetailCard />
      </Container>
    </div>
  );
};
