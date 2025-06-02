import { Customer } from '@/types/customer';
import { Card } from 'react-bootstrap';

interface CustomerDetailCardProps {
  customer: Customer;
}

export default function CustomerDetailCard({ customer }: CustomerDetailCardProps) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <h4 className="mb-3">{customer.name}</h4>
        <div className="mb-3">
          <div className="info-label">電話番号</div>
          <div>{customer.phoneNumber}</div>
        </div>
        <div className="mb-3">
          <div className="info-label">会社名</div>
          <div>{customer.company || '未設定'}</div>
        </div>
        <div className="mb-3">
          <div className="info-label">登録日</div>
          <div>{new Date(customer.createdAt).toLocaleDateString('ja-JP')}</div>
        </div>
        <div>
          <div className="info-label">最終更新日</div>
          <div>{new Date(customer.updatedAt).toLocaleDateString('ja-JP')}</div>
        </div>
      </Card.Body>
    </Card>
  );
} 