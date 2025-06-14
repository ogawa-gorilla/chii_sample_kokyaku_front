import { useAppDispatch } from '@/hooks';
import { resetSearchConditions, setSearchText, startNewInvoice, updateInvoiceDraft } from '@/store/features/invoiceSlice';
import { setCurrentPage } from '@/store/navigationSlice';
import { Customer } from '@/types/customer';
import { Page } from '@/types/page';
import { useState } from 'react';
import { Button, Container, Form, Modal } from 'react-bootstrap';

interface CustomerDetailActionBarProps {
  customer: Customer;
  onDelete: (customerId: string) => void;
  onEdit: () => void;
}

export default function CustomerDetailActionBar({ customer, onDelete, onEdit }: CustomerDetailActionBarProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (deleteConfirmText === '削除する') {
      onDelete(customer.id);
    }
  };

  const handleCreateInvoice = () => {
    dispatch(startNewInvoice());
    dispatch(setCurrentPage(Page.invoiceCreate));
    setTimeout(() => {
      dispatch(updateInvoiceDraft({ customerId: customer.id, customerName: customer.name, customerReading: customer.nameReading, company: customer.company }));
    }, 0);
  };

  const handleCloseModal = () => {
    setShowDeleteConfirm(false);
    setDeleteConfirmText('');
  };

  const handleSearchInvoices = () => {
    dispatch(resetSearchConditions());
    setTimeout(() => {
      dispatch(setSearchText(customer.name));
      dispatch(setCurrentPage(Page.invoiceList));
    }, 0);
  };

  return (
    <>
      <div className="action-bar">
        <Container>
          <div className="action-buttons">
            <div className="top-row">
              <Button 
                variant="primary"
                className="action-button"
                onClick={onEdit}
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
            <div className="bottom-row">
              <Button 
                variant="info"
                className="action-button"
                onClick={handleSearchInvoices}
              >
                請求書検索
              </Button>
              <Button 
                variant="success"
                className="action-button"
                onClick={handleCreateInvoice}
              >
                新規請求書
              </Button>
            </div>
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
    </>
  );
} 