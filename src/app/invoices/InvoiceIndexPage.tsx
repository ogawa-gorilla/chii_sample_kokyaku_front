'use client';

import { Button, Container, Form } from "react-bootstrap";
import { InvoiceCardList } from "./components/InvoiceCardList";

export const InvoiceIndexPage = () => {
  return (
    <div>
      <style>{`
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
          <InvoiceCardList />
        </Container>
      </div>
    </div>
  );
};
