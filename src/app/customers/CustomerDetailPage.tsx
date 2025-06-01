'use client';

import { Button, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteCustomer } from '../../store/features/customerSlice';
import { setCurrentPage } from '../../store/navigationSlice';
import { Page } from '../../types/page';
import CustomerDetailActionBar from './components/CustomerDetailActionBar';
import CustomerDetailCard from './components/CustomerDetailCard';

export default function CustomerDetailPage() {
  const selectedCustomerId = useAppSelector(state => state.customer.selectedCustomerId);
  const customer = useAppSelector(state => 
    state.customer.customers.find(c => c.id === selectedCustomerId)
  );
  const dispatch = useAppDispatch();

  const handleDelete = (customerId: string) => {
    dispatch(deleteCustomer(customerId));
    dispatch(setCurrentPage(Page.customerList));
  };

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
            bottom: 20;
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
          .action-buttons {
            display: flex;
            gap: 1rem;
          }
          .delete-button {
            background-color: #dc3545;
            border-color: #dc3545;
          }
          .delete-button:hover {
            background-color: #c82333;
            border-color: #bd2130;
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
          <CustomerDetailCard customer={customer} />
        </Container>
      </div>
      <CustomerDetailActionBar 
        customer={customer}
        onDelete={handleDelete}
      />
    </div>
  );
} 