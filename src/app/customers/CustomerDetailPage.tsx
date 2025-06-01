'use client';

import { Button, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteCustomer, saveDraft, startEditing } from '../../store/features/customerSlice';
import { setCurrentPage } from '../../store/navigationSlice';
import { Page } from '../../types/page';
import CustomerDetailActionBar from './components/CustomerDetailActionBar';
import CustomerDetailCard from './components/CustomerDetailCard';
import CustomerDetailEditor from './components/CustomerDetailEditor';
import CustomerDetailEditorActionBar from './components/CustomerDetailEditorActionBar';

export default function CustomerDetailPage() {
  const selectedCustomerId = useAppSelector(state => state.customer.selectedCustomerId);
  const customer = useAppSelector(state => 
    state.customer.customers.find(c => c.id === selectedCustomerId)
  );
  const isEditing = useAppSelector(state => state.customer.editing);
  const dispatch = useAppDispatch();

  const handleDelete = (customerId: string) => {
    dispatch(deleteCustomer(customerId));
    dispatch(setCurrentPage(Page.customerList));
  };

  const handleEdit = () => {
    dispatch(startEditing());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveDraft());
  };

  if (!customer) {
    return (
      <Container className="mt-4">
        <div>顧客が見つかりませんでした。</div>
        <Button onClick={() => dispatch(setCurrentPage(Page.customerList))}>
          戻る
        </Button>
      </Container>
    );
  }

  return (
    <div className="page-container">
      <style>
        {`
          .page-container {
            display: flex;
            flex-direction: column;
            min-height: 100%;
            position: relative;
          }
          .info-label {
            color: #6c757d;
            font-size: 0.9rem;
          }
          .main-content {
            flex: 1;
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 80px; /* フッターの高さ分 */
          }
          .action-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            margin-bottom: 60px; /* フッターの高さ分 */
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
          .fixed-header-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: white;
            z-index: 1000;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .navbar {
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}
      </style>
      <div className="fixed-header-container">
        <nav className="navbar">
          <Button variant="primary" size="sm" onClick={() => dispatch(setCurrentPage(Page.customerList))}>
            ← 戻る
          </Button>
          <span className="navbar-brand mb-0 h5">
            {isEditing ? '顧客情報編集' : '顧客詳細'}
          </span>
          <span></span>
        </nav>
      </div>
      <div className="main-content">
        <Container>
          {isEditing ? (
            <CustomerDetailEditor 
              customer={customer}
              onSubmit={handleSubmit}
            />
          ) : (
            <CustomerDetailCard customer={customer} />
          )}
        </Container>
      </div>
      {isEditing ? (
        <CustomerDetailEditorActionBar onSubmit={handleSubmit} />
      ) : (
        <CustomerDetailActionBar 
          customer={customer}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
} 