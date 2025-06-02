import { Button } from "react-bootstrap";

// 削除されたアイテムの型定義
export interface TrashedInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  deletedAt: Date;
}

interface DeletedInvoiceCardProps {
  invoice: TrashedInvoice;
  onRestore: (id: string) => void;
  onPermanentDelete: (id: string) => void;
}

export const DeletedInvoiceCard = ({ 
  invoice, 
  onRestore, 
  onPermanentDelete 
}: DeletedInvoiceCardProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="col-12 mb-3">
      <div className="card h-100">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h6 className="card-title mb-0">{invoice.invoiceNumber}</h6>
            <small className="text-muted">削除日時：{formatDate(invoice.deletedAt)}</small>
          </div>
          <div className="row align-items-center">
            <div className="col-md-8">
              <p className="card-text mb-1 text-muted">{invoice.customerName}</p>
              <p className="card-text mb-0 fw-bold">{formatCurrency(invoice.amount)}</p>
            </div>
            <div className="col-md-4 text-end">
              <div className="action-buttons">
                <Button 
                  variant="outline-success" 
                  size="sm"
                  onClick={() => onRestore(invoice.id)}
                  className="me-2"
                >
                  <i className="fas fa-undo me-1"></i>
                  戻す
                </Button>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  onClick={() => onPermanentDelete(invoice.id)}
                >
                  <i className="fas fa-trash-alt me-1"></i>
                  完全削除
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 