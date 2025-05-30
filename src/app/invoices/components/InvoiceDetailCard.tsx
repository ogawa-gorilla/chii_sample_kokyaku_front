import { Button, Card } from "react-bootstrap";
import { Invoice } from "../../../types/invoice";

interface InvoiceDetailCardProps {
  invoice: Invoice;
}

export const InvoiceDetailCard = (props: InvoiceDetailCardProps) => {
  return (
    <div>
      <style>
      .info-label {`
          color: #6c757d;
          font-size: 0.9rem;
        }
          `}
      </style>
    <Card className="shadow-sm">
          <div className="card-body">
            <h5 className="card-title mb-3">請求書詳細</h5>

            <div className="mb-2">
              <div className="info-label">名前:</div>
              <div className="d-flex align-items-center">
                <span className="me-2">{props.invoice.customerName}</span>
                <Button 
                  size="sm" 
                  variant="outline-secondary"
                  onClick={() => window.location.href = '/customers/1'}
                  style={{ padding: '0.25rem 0.5rem' }}
                >
                  <i className="bi bi-person"></i> 顧客詳細
                </Button>
              </div>
            </div>

            <div className="mb-2">
              <div className="info-label">会社名:</div>
              <div>{props.invoice.company}</div>
            </div>

            <div className="mb-2">
              <div className="info-label">請求日:</div>
              <div>{props.invoice.date}</div>
            </div>

            <div className="mb-2">
              <div className="info-label">請求番号:</div>
              <div>#{props.invoice.invoiceNumber}</div>
            </div>

            <div className="mb-2">
              <div className="info-label">金額:</div>
              <div>¥{props.invoice.amount.toLocaleString()}</div>
            </div>

            <div className="mb-2">
              <div className="info-label">支払いステータス:</div>
              <div>
                <span className="badge bg-warning text-dark">{props.invoice.status}</span>
              </div>
            </div>
          </div>
        </Card>
        </div>
  );
};