'use client';

import { Button, Container, Form } from "react-bootstrap"
import { CustomerList } from "./components/CustomerList"

export default function CustomerIndexPage () {
  return (
    <div>
      <style>
        {`
        .customer-card {
        border: 1px solid #dee2e6;
        border-radius: 0.5rem;
        padding: 1rem;
        margin-bottom: 1rem;
      }
      .fixed-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        background: #f8f9fa;
        border-top: 1px solid #ddd;
      }
        `}
      </style>
      <nav className="navbar bg-white shadow-sm px-3">
        <span className="navbar-brand mb-0 h5">顧客一覧</span>
        <Button size="sm" color="primary">＋新規登録</Button>
      </nav>
      <Container className="mt-3">
        <Form>
          <Form.Control type="text" placeholder="名前・電話番号・会社名で検索" />
        </Form>
      </Container>
      <CustomerList />
      <div className="fixed-footer d-flex justify-content-around py-2">
        <a href="#" className="text-center text-muted">
          <div>🏠</div>
          <small>ホーム</small>
        </a>
        <a href="#" className="text-center text-primary">
          <div>👤</div>
          <small>顧客</small>
        </a>
        <a href="#" className="text-center text-muted">
          <div>📅</div>
          <small>予定</small>
        </a>
        <a href="#" className="text-center text-muted">
          <div>⚙️</div>
          <small>設定</small>
        </a>
      </div>
    </div>
  )
}