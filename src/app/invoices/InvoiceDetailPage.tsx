'use client';

import { Button, Card, Container } from "react-bootstrap";

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
        <Card className="shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">請求書詳細</h5>

            <div className="mb-2">
              <div className="info-label">名前:</div>
              <div className="d-flex align-items-center">
                <span className="me-2">山田 太郎</span>
                <Button 
                  size="sm" 
                  variant="outline-secondary"
                  onClick={() => window.location.href = '/customers/1'}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  <i className="bi bi-person"></i> 顧客詳細
                </Button>
              </div>
            </div>

            <div className="mb-2">
              <div className="info-label">会社名:</div>
              <div>株式会社サンプル</div>
            </div>

            <div className="mb-2">
              <div className="info-label">請求日:</div>
              <div>2025年5月30日</div>
            </div>

            <div className="mb-2">
              <div className="info-label">請求番号:</div>
              <div>#INV-20250530-001</div>
            </div>

            <div className="mb-2">
              <div className="info-label">金額:</div>
              <div>¥120,000</div>
            </div>

            <div className="mb-2">
              <div className="info-label">支払いステータス:</div>
              <div>
                <span className="badge bg-warning text-dark">未払い</span>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </div>
  );
};
