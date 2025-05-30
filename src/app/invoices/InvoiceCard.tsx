import { Card, Button } from "react-bootstrap"
import { setCurrentPage } from "../../store/navigationSlice"
import { Page } from "../../types/page"
import { useAppDispatch } from "../../hooks";

export const InvoiceCard = () => {
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
                <div className="invoice-title">加藤 博司</div>
                <div className="invoice-meta">株式会社サンプル</div>
                <div className="invoice-meta">請求日：2025/05/20</div>
                <div className="invoice-meta">請求番号：INV-00123</div>
              </div>
              <div className="text-end d-flex flex-column justify-content-between">
                <div>
                  <div className="amount">¥120,000</div>
                  <div className="invoice-meta">未払い</div>
                </div>
                <div className="mt-2"><Button variant="outline-primary" onClick={() => dispatch(setCurrentPage(Page.invoiceDetail))}>詳細</Button></div>
              </div>
            </div>
          </div>
        </Card>
        </div>
  )
}