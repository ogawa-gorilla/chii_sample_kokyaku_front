'use client';

import { Button, Container, Form } from "react-bootstrap"
import { CustomerList } from "./components/CustomerList"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearchQuery } from "../../store/features/customerSlice";

export default function CustomerIndexPage () {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.customer.searchQuery);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

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
        .fixed-header-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: white;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .navbar {
          padding: 0.75rem 1rem;
          background: #2C3E50;
          margin: 0;
          color: white;
        }
        .navbar .navbar-brand {
          color: white;
          margin: 0;
        }
        .navbar .btn-primary {
          background-color: #3498DB;
          border-color: #3498DB;
          color: white;
        }
        .navbar .btn-primary:hover {
          background-color: #2980B9;
          border-color: #2980B9;
        }
        .search-area {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #eee;
        }
        .fixed-footer {
          position: fixed;
          bottom: 0;
          width: 100%;
          background: #f8f9fa;
          border-top: 1px solid #ddd;
          padding: 0.5rem 0;
          z-index: 1000;
        }
        .main-content {
          padding-top: 130px; /* ヘッダーと検索バーの高さ分 */
          padding-bottom: 80px; /* フッターの高さ分 */
        }
        `}
      </style>
      <div className="fixed-header-container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h5">顧客一覧</span>
          <Button size="sm" variant="primary">＋新規登録</Button>
        </nav>
        <div className="search-area">
          <Container>
            <Form>
              <Form.Control 
                type="text" 
                placeholder="名前・会社名で検索" 
                value={searchQuery}
                onChange={handleSearch}
              />
            </Form>
          </Container>
        </div>
      </div>
      <div className="main-content">
        <Container>
          <CustomerList />
        </Container>
      </div>
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