import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateInvoiceDraft } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice } from "@/types/invoice";
import { Page } from "@/types/page";
import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { StatusSelect } from "./StatusSelect";

interface InvoiceEditFormProps {
  onSubmit: (data: Partial<Invoice>) => void;
}

export const InvoiceEditForm = (props: InvoiceEditFormProps) => {
  const dispatch = useAppDispatch();
  const [isBasicInfoEditable, setIsBasicInfoEditable] = useState(false);
  const invoiceDraft = useAppSelector(state => state.invoice.invoiceDraft);

  if (!invoiceDraft) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <style>
        {`
          .action-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            margin-bottom: 60px;
          }
          .action-buttons {
            display: grid;
            grid-template-rows: auto auto;
            gap: 1rem;
          }
          .action-button {
            width: 100%;
            padding: 0.8rem;
          }
        `}
      </style>
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title mb-3">支払い状況</h6>
          <div className="mb-3">
            <Form.Label>ステータス</Form.Label>
            <StatusSelect
              selectedStatus={invoiceDraft!.status}
              onStatusChange={(status) => dispatch(updateInvoiceDraft({ ...invoiceDraft, status }))}
            />
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div 
          className="card-body"
          style={{ 
            backgroundColor: isBasicInfoEditable ? 'white' : '#f8f9fa',
            transition: 'background-color 0.2s ease'
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="card-title mb-0">基本情報</h6>
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => setIsBasicInfoEditable(!isBasicInfoEditable)}
            >
              {isBasicInfoEditable ? '編集完了' : '訂正'}
            </Button>
          </div>
          <div className="mb-3">
            <Form.Label>顧客</Form.Label>
            <div className="border rounded p-3 bg-light">
              <div className="mb-2">
                <strong>名前:</strong> {invoiceDraft.customerName}
              </div>
              <div className="mb-2">
                <strong>フリガナ:</strong> {invoiceDraft.customerReading}
              </div>
              <div>
                <strong>会社名:</strong> {invoiceDraft.company}
              </div>
            </div>
          </div>

          <div className="mb-3">
            <Form.Label>請求日</Form.Label>
            <Form.Control
              type="date"
              value={invoiceDraft.date.split('/').join('-')}
              onChange={(e) => dispatch(updateInvoiceDraft({ date: e.target.value.split('-').join('/') }))}
              disabled={!isBasicInfoEditable}
              style={{ backgroundColor: isBasicInfoEditable ? 'white' : '#f8f9fa' }}
            />
          </div>

          <div className="mb-3">
            <Form.Label>請求番号</Form.Label>
            <Form.Control
              type="text"
              value={invoiceDraft.invoiceNumber}
              onChange={(e) => dispatch(updateInvoiceDraft({ invoiceNumber: e.target.value }))}
              disabled={!isBasicInfoEditable}
              style={{ backgroundColor: isBasicInfoEditable ? 'white' : '#f8f9fa' }}
            />
          </div>

          <div className="mb-3">
            <Form.Label>金額</Form.Label>
            <Form.Control
              type="number"
              value={invoiceDraft.amount}
              onChange={(e) => dispatch(updateInvoiceDraft({ amount: Number(e.target.value) }))}
              disabled={!isBasicInfoEditable}
              style={{ backgroundColor: isBasicInfoEditable ? 'white' : '#f8f9fa' }}
            />
          </div>
        </div>
      </div>

      <div className="action-bar">
        <Container>
          <div className="action-buttons">
            <Button 
              variant="secondary"
              className="action-button"
              onClick={() => dispatch(setCurrentPage(Page.invoiceDetail))}
            >
              キャンセル
            </Button>
            <Button 
              variant="primary"
              className="action-button"
              type="submit"
              onClick={() => {
                props.onSubmit(invoiceDraft);
                dispatch(setCurrentPage(Page.invoiceDetail));
              }}
            >
              保存
            </Button>
          </div>
        </Container>
      </div>
    </Form>
  )
}