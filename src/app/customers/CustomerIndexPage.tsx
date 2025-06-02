'use client';

import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSearchQuery, setSortOrder, startNewCustomer } from "@/store/features/customerSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { CustomerSortOrder, SORT_ORDER_LABELS } from "@/types/customer";
import { Page } from "@/types/page";
import { Button, Container, Form } from "react-bootstrap";
import { CustomerList } from "./components/CustomerList";

export default function CustomerIndexPage () {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector(state => state.customer.searchQuery);
  const sortOrder = useAppSelector(state => state.customer.sortOrder);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOrder(e.target.value as CustomerSortOrder));
  };

  const handleNewCustomer = () => {
    dispatch(startNewCustomer());
    dispatch(setCurrentPage(Page.customerDetail));
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
          padding-top: 180px; /* ヘッダーと検索バーの高さ分（2行分に増やす） */
          padding-bottom: 80px; /* フッターの高さ分 */
        }
        .search-sort-container {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .search-row, .sort-row {
          display: flex;
          gap: 1rem;
          align-items: center;
        }
        .search-input {
          flex: 1;
        }
        .sort-label {
          white-space: nowrap;
          color: #666;
        }
        .sort-select {
          width: 100%;
          max-width: 300px;
        }
        `}
      </style>
      <div className="fixed-header-container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h5">顧客一覧</span>
          <Button size="sm" variant="primary" onClick={handleNewCustomer}>＋新規登録</Button>
        </nav>
        <div className="search-area">
          <Container>
            <div className="search-sort-container">
              <div className="search-row">
                <Form.Control 
                  type="text" 
                  placeholder="名前・会社名で検索" 
                  value={searchQuery}
                  onChange={handleSearch}
                  className="search-input"
                />
              </div>
              <div className="sort-row">
                <span className="sort-label">並び順：</span>
                <Form.Select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  {Object.entries(SORT_ORDER_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <div className="main-content">
        <CustomerList />
      </div>
    </div>
  )
}