import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { Page } from "@/types/page";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface InvoiceEditFormProps {
  invoice: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
}

export const InvoiceEditForm = ({ invoice, onSubmit }: InvoiceEditFormProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const customers = useAppSelector(state => state.customer.customers);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    customerId: invoice.customerId,
    date: invoice.date,
    invoiceNumber: invoice.invoiceNumber,
    amount: invoice.amount,
    status: invoice.status
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleCreateCustomer = () => {
    dispatch(setCurrentPage(Page.customerDetail));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="card-title mb-0">コア情報</h6>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'ロック' : 'ロック解除'}
            </Button>
          </div>

          <div className="mb-3">
            <Form.Label>顧客</Form.Label>
            <div className="d-flex gap-2">
              <Form.Select
                disabled={!isEditing}
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              >
                <option value="">選択してください</option>
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name} ({customer.nameReading})
                  </option>
                ))}
              </Form.Select>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleCreateCustomer}
              >
                <i className="bi bi-plus"></i> 新規顧客
              </Button>
            </div>
          </div>

          <div className="mb-3">
            <Form.Label>請求日</Form.Label>
            <Form.Control
              type="date"
              disabled={!isEditing}
              value={formData.date?.replace('/', '-')}
              onChange={(e) => setFormData({ ...formData, date: e.target.value.replace('-', '/') })}
            />
          </div>

          <div className="mb-3">
            <Form.Label>請求番号</Form.Label>
            <Form.Control
              type="text"
              disabled={!isEditing}
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label>金額</Form.Label>
            <Form.Control
              type="number"
              disabled={!isEditing}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h6 className="card-title mb-3">支払い状況</h6>
          <div className="mb-3">
            <Form.Label>ステータス</Form.Label>
            <Form.Select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as InvoiceStatus })}
            >
              <option value={InvoiceStatus.UNPAID}>未払い</option>
              <option value={InvoiceStatus.PAID}>支払い済み</option>
            </Form.Select>
          </div>
        </div>
      </div>

      <div className="fixed-bottom p-3 bg-white border-top" style={{ marginBottom: '60px' }}>
        <div className="container d-grid">
          <Button type="submit" variant="primary">
            保存
          </Button>
        </div>
      </div>
    </Form>
  );
}; 