'use client';

import { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteCustomer } from '../../store/features/customerSlice';
import { setCurrentPage } from '../../store/navigationSlice';
import { Page } from '../../types/page';
import CustomerDetailCard from './components/CustomerDetailCard';

export default function CustomerDetailPage() {
  const selectedCustomerId = useAppSelector(state => state.customer.selectedCustomerId);
  const customer = useAppSelector(state => 
    state.customer.customers.find(c => c.id === selectedCustomerId)
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (deleteConfirmText === '削除する') {
      dispatch(deleteCustomer(selectedCustomerId));
      dispatch(setCurrentPage(Page.customerList));
    }
  };

  const handleCloseModal = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmText('');
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
      <div className="action-bar">
        <Container>
          <div className="action-buttons">
            <Button 
              variant="primary"
              className="action-button"
            >
              編集
            </Button>
            <Button 
              variant="danger"
              className="action-button"
              onClick={() => setShowDeleteConfirm(true)}
            >
              削除
            </Button>
          </div>
        </Container>
      </div>

      <Modal show={showDeleteConfirm} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>削除の確認</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>本当に{customer.name}さんを削除してもよろしいですか？</p>
          <p className="text-danger">この操作は取り消せません。</p>
          <Form.Group className="mt-3">
            <Form.Label>確認のため「削除する」と入力してください：</Form.Label>
            <Form.Control
              type="text"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              placeholder="削除する"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            キャンセル
          </Button>
          <Button 
            variant="danger" 
            onClick={handleDelete}
            disabled={deleteConfirmText !== '削除する'}
          >
            削除する
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
} 