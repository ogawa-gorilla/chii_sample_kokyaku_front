'use client';

import { Button, Container, Form } from "react-bootstrap"
import { CustomerList } from "./components/CustomerList"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setSearchQuery } from "../../store/features/customerSlice";
import { Footer } from "../components/common/Footer";

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
        .search-area {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #eee;
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
    </div>
  )
}