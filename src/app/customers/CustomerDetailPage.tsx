'use client';

import { Button, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cancelEditing, deleteCustomer, startEditing, updateCustomer } from '../../store/features/customerSlice';
import { setCurrentPage } from '../../store/navigationSlice';
import { Customer } from '../../types/customer';
import { Page } from '../../types/page';
import CustomerDetailActionBar from './components/CustomerDetailActionBar';
import CustomerDetailCard from './components/CustomerDetailCard';
import CustomerDetailEditor from './components/CustomerDetailEditor';

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

  const handleCancelEdit = () => {
    dispatch(cancelEditing());
  };

  const handleSave = (updatedCustomer: Customer) => {
    dispatch(updateCustomer(updatedCustomer));
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
              onSave={handleSave}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <CustomerDetailCard customer={customer} />
              <CustomerDetailActionBar 
                customer={customer}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            </>
          )}
        </Container>
      </div>
    </div>
  );
} 