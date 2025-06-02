import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateDraft } from '@/store/features/customerSlice';
import { Customer } from '@/types/customer';
import { Card, Form } from 'react-bootstrap';

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

  const isFieldChanged = (field: keyof Customer) => {
    return draftCustomer[field] !== customer[field];
  };

  const getLabelClassName = (field: keyof Customer) => {
    return `form-label ${isFieldChanged(field) ? 'modified' : ''}`;
  };

  const getLabelText = (field: keyof Customer, label: string) => {
    return `${label}${isFieldChanged(field) ? ' *' : ''}`;
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('name')}>
              {getLabelText('name', '名前')}
            </Form.Label>
            <Form.Control
              type="text"
              value={draftCustomer.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('nameReading')}>
              {getLabelText('nameReading', 'フリガナ')}
            </Form.Label>
            <Form.Control
              type="text"
              value={draftCustomer.nameReading}
              onChange={(e) => handleChange('nameReading', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('phoneNumber')}>
              {getLabelText('phoneNumber', '電話番号')}
            </Form.Label>
            <Form.Control
              type="tel"
              value={draftCustomer.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('company')}>
              {getLabelText('company', '会社名')}
            </Form.Label>
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