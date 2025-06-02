import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateInvoiceDraft } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice } from "@/types/invoice";
import { Page } from "@/types/page";
import { Button, Container, Form } from "react-bootstrap";
import { StatusSelect } from "./StatusSelect";

interface InvoiceEditFormProps {
  invoiceDraft: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
}

export const InvoiceEditForm = (props: InvoiceEditFormProps) => {
  const dispatch = useAppDispatch();
  const invoiceDraft = useAppSelector(state => state.invoice.invoiceDraft);

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
              selectedStatus={props.invoiceDraft.status}
              onStatusChange={(status) => dispatch(updateInvoiceDraft({ ...invoiceDraft, status }))}
            />
          </div>
        </div>
      </div>
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="card-title mb-0">基本情報</h6>
          </div>
          <div className="mb-3">
            <Form.Label>顧客</Form.Label>
            
          </div>

          <div className="mb-3">
            <Form.Label>請求日</Form.Label>
            <Form.Control
              type="date"
              value={props.invoiceDraft.date.split('/').join('-')}
              onChange={(e) => dispatch(updateInvoiceDraft({ date: e.target.value.split('-').join('/') }))}
            />
          </div>

          <div className="mb-3">
            <Form.Label>請求番号</Form.Label>
            <Form.Control
              type="text"
              value={props.invoiceDraft.invoiceNumber}
              onChange={(e) => dispatch(updateInvoiceDraft({ ...invoiceDraft, invoiceNumber: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <Form.Label>金額</Form.Label>
            <Form.Control
              type="number"
              value={props.invoiceDraft.amount}
              onChange={(e) => dispatch(updateInvoiceDraft({ ...invoiceDraft, amount: Number(e.target.value) }))}
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
            >
              保存
            </Button>
          </div>
        </Container>
      </div>
    </Form>
  )
}