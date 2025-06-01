import { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { Customer } from '../../../types/customer';

interface CustomerDetailEditorProps {
  customer: Customer;
  onSave: (customer: Customer) => void;
  onCancel: () => void;
}

export default function CustomerDetailEditor({ customer, onSave, onCancel }: CustomerDetailEditorProps) {
  const [formData, setFormData] = useState({
    name: customer.name,
    phoneNumber: customer.phoneNumber,
    company: customer.company || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...customer,
      ...formData,
    });
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="info-label">名前</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="info-label">電話番号</Form.Label>
            <Form.Control
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="info-label">会社名</Form.Label>
            <Form.Control
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="未設定"
            />
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={onCancel}>
              キャンセル
            </Button>
            <Button variant="primary" type="submit">
              保存
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
} 