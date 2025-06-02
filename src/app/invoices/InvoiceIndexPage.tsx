'use client';

import { useAppDispatch } from "@/hooks";
import { setSearchText } from "@/store/features/invoiceSlice";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { InvoiceCardList } from "./components/InvoiceCardList";

export const InvoiceIndexPage = () => {
  const dispatch = useAppDispatch();
  const [localSearchText, setLocalSearchText] = useState("");
  const [startMonth, setStartMonth] = useState("2024-03");
  const [endMonth, setEndMonth] = useState("2024-03");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setLocalSearchText(text);
    dispatch(setSearchText(text));
  };

  return (
    <div>
      <style>{`
        .search-area {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #eee;
        }
        .main-content {
          padding-top: 200px;
          padding-bottom: 80px;
        }
        @media (max-width: 575.98px) {
          .main-content {
            padding-top: 280px;
          }
        }
        `}
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
                value={localSearchText}
                onChange={handleSearch}
              />
            </Form>
            <Form>
              <Form.Check className="mt-2 mb-2" type="checkbox" label="未払いのみ表示" />
            </Form>
            <Form>
              <div className="row g-2 align-items-center">
                <div className="col-sm-5">
                  <Form.Control 
                    type="month" 
                    value={startMonth}
                    onChange={(e) => setStartMonth(e.target.value)}
                  />
                </div>
                <div className="col-sm-auto">
                  <span>～</span>
                </div>
                <div className="col-sm-5">
                  <Form.Control 
                    type="month" 
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                  />
                </div>
              </div>
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
