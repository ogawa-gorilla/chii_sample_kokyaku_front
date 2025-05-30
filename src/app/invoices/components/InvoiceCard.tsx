import { Card, Button } from "react-bootstrap"
import { setCurrentPage } from "../../../store/navigationSlice"
import { Page } from "../../../types/page"
import { useAppDispatch } from "../../../hooks";
import { Invoice } from "../../../types/invoice";
import { setSelectedInvoice } from "../../../store/features/invoiceSlice";

interface InvoiceCardProps {
  invoice: Invoice;
}

export const InvoiceCard = (props: InvoiceCardProps) => {
  const dispatch = useAppDispatch();
  
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
        .invoice-meta {
          font-size: 0.9rem;
          color: #6c757d;
        }
        .amount {
          font-weight: 500;
          font-size: 1.1rem;
          color: #5c4db1;
        }`}
      </style>
    <Card className="invoice-card shadow-sm">
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
                  <div className="invoice-meta">{props.invoice.status}</div>
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