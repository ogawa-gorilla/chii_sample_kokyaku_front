import { useAppDispatch, useAppSelector } from "@/hooks";
import { setSelectedCustomer } from "@/store/features/customerSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { Page } from "@/types/page";
import { Button, Card } from "react-bootstrap";

interface InvoiceDetailCardProps {
  invoice: Invoice;
}

export const InvoiceDetailCard = (props: InvoiceDetailCardProps) => {
  const dispatch = useAppDispatch();
  const customerExists = useAppSelector(state => 
    state.customer.customers.some(c => c.id === props.invoice.customerId)
  );

  const handleCustomerClick = () => {
    if (customerExists) {
      dispatch(setSelectedCustomer(props.invoice.customerId));
      dispatch(setCurrentPage(Page.customerDetail));
    }
  };

  const badgeClass = props.invoice.status === InvoiceStatus.PAID ? 'bg-success text-white' : 'bg-warning text-dark';

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
                <div>
                  <div>{props.invoice.customerName}</div>
                  <div className="text-muted small">{props.invoice.customerReading}</div>
                </div>
                {customerExists && (
                  <Button 
                    size="sm" 
                    variant="outline-secondary"
                    onClick={handleCustomerClick}
                    style={{ padding: '0.25rem 0.5rem', marginLeft: '0.5rem' }}
                  >
                    <i className="bi bi-person"></i> 顧客詳細
                  </Button>
                )}
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
                <span className={"badge text-dark " + badgeClass}>{props.invoice.status}</span>
              </div>
            </div>
          </div>
        </Card>
        </div>
  );
};