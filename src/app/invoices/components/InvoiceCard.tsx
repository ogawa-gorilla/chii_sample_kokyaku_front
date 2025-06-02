import { useAppDispatch } from "@/hooks";
import { setSelectedInvoice } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { Page } from "@/types/page";
import { Button, Card } from "react-bootstrap";

interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard = (props: InvoiceCardProps) => {
  const dispatch = useAppDispatch();

  const badgeClass = props.invoice.status === InvoiceStatus.PAID ? 'bg-success text-white' : 'bg-warning text-dark';
  const bgClass = props.invoice.status === InvoiceStatus.PAID ? '' : 'bg-card-warning';

  return (
    <div>
      <style>{`
      .invoice-card {
          margin-bottom: 1rem;
        }
        .invoice-title {
          font-weight: 600;
          font-size: 1.1rem;
        }
        .amount {
          font-weight: 500;
          font-size: 1.1rem;
          color: #5c4db1;
        }
        .bg-card-warning {
          background-color: rgba(255, 193, 7, 0.15) !important;
        }
        `}
      </style>
    <Card className={"invoice-card shadow-sm " + bgClass}>
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <div className="invoice-title">{props.invoice.customerName}</div>
                <div className="invoice-meta">{props.invoice.company}</div>
                <div className="invoice-meta">請求日：{props.invoice.date}</div>
                <div className="invoice-meta">請求番号：{props.invoice.invoiceNumber}</div>
              </div>
              <div className="text-end d-flex flex-column justify-content-between">
                <div>
                  <div className="amount">¥{props.invoice.amount.toLocaleString()}</div>
                  <span className={"badge " + badgeClass}>{props.invoice.status}</span>
                </div>
                <div className="mt-2"><Button variant="outline-primary" onClick={() => {
                                    dispatch(setSelectedInvoice(props.invoice.id))
                                    dispatch(setCurrentPage(Page.invoiceDetail))
                  }}>詳細</Button></div>
              </div>
            </div>
          </div>
        </Card>
        </div>
  )
}