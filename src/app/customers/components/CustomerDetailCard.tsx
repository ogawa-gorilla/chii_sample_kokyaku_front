import { Customer } from '@/types/customer';
import { Card } from 'react-bootstrap';

interface CustomerDetailCardProps {
  customer: Customer;
}

export default function CustomerDetailCard({ customer }: CustomerDetailCardProps) {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{customer.nameReading}</Card.Subtitle>
        <Card.Text>
          <strong>電話番号：</strong> {customer.phoneNumber}<br />
          <strong>会社名：</strong> {customer.company || '未設定'}<br />
          <strong>登録日：</strong> {new Date(customer.createdAt).toLocaleString('ja-JP')}<br />
          <strong>更新日：</strong> {new Date(customer.updatedAt).toLocaleString('ja-JP')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
} 