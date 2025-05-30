'use client';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { Container, Card, Button } from 'react-bootstrap';
import { Page } from '../../types/page';
import { setCurrentPage } from '../../store/navigationSlice';

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
        `}
      </style>
      <div className="fixed-header-container">
        <nav className="navbar">
        <Button variant="primary" size="sm" onClick={() => dispatch(setCurrentPage(Page.customerList))}>
            ← 戻る
          </Button>
          <span className="navbar-brand mb-0 h5">顧客詳細</span>
          <Button variant="primary" size="sm">
            編集
          </Button>
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
    </div>
  );
} 