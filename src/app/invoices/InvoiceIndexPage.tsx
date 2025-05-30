'use client';

import { Button, Card, Container, Form } from "react-bootstrap";

export const InvoiceIndexPage = () => {
  return (
    <div>
      <style>{`
        .invoice-card {
          margin-bottom: 1rem;
        }
        .invoice-title {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .invoice-meta {
          font-size: 0.9rem;
          color: #6c757d;
        }
        .amount {
          font-weight: 500;
          font-size: 1.1rem;
          color: #5c4db1;
        }
        .search-area {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #eee;
        }
        .main-content {
          padding-top: 200px; /* ヘッダーと検索バーの高さ分 */
          padding-bottom: 80px; /* フッターの高さ分 */
        }`}
      </style>
      
      <div className="fixed-header-container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h5">請求書一覧</span>
          <Button size="sm" variant="primary">＋新規登録</Button>
        </nav>
        <div className="search-area">
          <Container>
            <Form>
              <Form.Control 
                type="text" 
                placeholder="名前・会社名・番号で検索"
              />
            </Form>
            <Form>
              <Form.Check className="mt-2 mb-2" type="checkbox" label="未払いのみ表示" />
            </Form>
            <Form className="d-flex align-items-center gap-2">
              <input type="date" className="form-control" />
              <span>～</span>
              <input type="date" className="form-control" />
            </Form>
          </Container>
        </div>
      </div>
      <div className="main-content">
        <Container className="mt-3 mb-5">
        <Card className="invoice-card shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="invoice-title">加藤 博司</div>
                <div className="invoice-meta">株式会社サンプル</div>
                <div className="invoice-meta">請求日：2025/05/20</div>
                <div className="invoice-meta">請求番号：INV-00123</div>
              </div>
              <div className="text-end">
                <div className="amount">¥120,000</div>
                <div className="invoice-meta">未払い</div>
              </div>
            </div>
          </div>
        </Card>
        </Container>
      </div>
    </div>
  );
};
