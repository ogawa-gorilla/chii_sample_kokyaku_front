import { Card, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { updateDraft } from '../../../store/features/customerSlice';
import { Customer } from '../../../types/customer';

interface CustomerDetailEditorProps {
  customer: Customer;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CustomerDetailEditor({ customer, onSubmit }: CustomerDetailEditorProps) {
  const dispatch = useAppDispatch();
  const draftCustomer = useAppSelector(state => state.customer.draftCustomer);

  const handleChange = (field: keyof Customer, value: string) => {
    dispatch(updateDraft({ [field]: value }));
  };

  if (!draftCustomer) return null;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="info-label">名前</Form.Label>
            <Form.Control
              type="text"
              value={draftCustomer.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="info-label">電話番号</Form.Label>
            <Form.Control
              type="tel"
              value={draftCustomer.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="info-label">会社名</Form.Label>
            <Form.Control
              type="text"
              value={draftCustomer.company}
              onChange={(e) => handleChange('company', e.target.value)}
              placeholder="未設定"
            />
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
} 