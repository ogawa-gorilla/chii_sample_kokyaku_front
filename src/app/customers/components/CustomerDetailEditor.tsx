import { Button, Card, Form } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { cancelEditing, saveDraft, updateDraft } from '../../../store/features/customerSlice';
import { Customer } from '../../../types/customer';

interface CustomerDetailEditorProps {
  customer: Customer;
}

export default function CustomerDetailEditor({ customer }: CustomerDetailEditorProps) {
  const dispatch = useAppDispatch();
  const draftCustomer = useAppSelector(state => state.customer.draftCustomer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(saveDraft());
  };

  const handleCancel = () => {
    dispatch(cancelEditing());
  };

  const handleChange = (field: keyof Customer, value: string) => {
    dispatch(updateDraft({ [field]: value }));
  };

  if (!draftCustomer) return null;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={handleSubmit}>
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

          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={handleCancel}>
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