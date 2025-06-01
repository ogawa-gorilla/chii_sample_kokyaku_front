'use client';

import { Button, Card, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/navigationSlice';
import { Page } from '../../types/page';

export default function CustomerDetailPage() {
  const selectedCustomerId = useAppSelector(state => state.customer.selectedCustomerId);
  const customer = useAppSelector(state => 
    state.customer.customers.find(c => c.id === selectedCustomerId)
  );

  const dispatch = useAppDispatch();

  if (!customer) {
    return (
      <Container className="mt-4">
        <div>顧客が見つかりませんでした。</div>
        <Button>
          戻る
        </Button>
      </Container>
    );
  }

  return (
    <div>
      <style>
        {`
          .info-label {
            color: #6c757d;
            font-size: 0.9rem;
          }
          .main-content {
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 80px; /* フッターの高さ分 */
          }
          .action-bar {
            position: fixed;
            bottom: 40;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
          }
          .action-button {
            width: 100%;
            padding: 0.8rem;
          }
        `}
      </style>
      <div className="fixed-header-container">
        <nav className="navbar">
          <Button variant="primary" size="sm" onClick={() => dispatch(setCurrentPage(Page.customerList))}>
            ← 戻る
          </Button>
          <span className="navbar-brand mb-0 h5">顧客詳細</span>
          <span></span>
        </nav>
      </div>
      <div className="main-content">
        <Container>
          <Card className="mb-3">
            <Card.Body>
              <h4 className="mb-3">{customer.name}</h4>
              <div className="mb-3">
                <div className="info-label">電話番号</div>
                <div>{customer.phoneNumber}</div>
              </div>
              <div className="mb-3">
                <div className="info-label">会社名</div>
                <div>{customer.company || '未設定'}</div>
              </div>
              <div className="mb-3">
                <div className="info-label">登録日</div>
                <div>{new Date(customer.createdAt).toLocaleDateString('ja-JP')}</div>
              </div>
              <div>
                <div className="info-label">最終更新日</div>
                <div>{new Date(customer.updatedAt).toLocaleDateString('ja-JP')}</div>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
      <div className="action-bar">
        <Container>
          <Button 
            variant="primary"
            className="action-button"
          >
            編集
          </Button>
        </Container>
      </div>
    </div>
  );
} 