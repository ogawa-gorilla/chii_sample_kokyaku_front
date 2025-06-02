'use client';

import { useAppDispatch } from "@/hooks";
import { Button, Container } from "react-bootstrap";

// 削除されたアイテムの型定義
interface TrashedInvoice {
  id: string;
  invoiceNumber: string;
  customerName: string;
  amount: number;
  deletedAt: Date;
}

export const InvoiceTrashIndexPage = () => {
  const dispatch = useAppDispatch();

  // モックデータ（削除日時降順でソート済み）
  const trashedInvoices: TrashedInvoice[] = [
    {
      id: "1",
      invoiceNumber: "INV-2024-001",
      customerName: "株式会社サンプル",
      amount: 120000,
      deletedAt: new Date("2024-01-15T10:30:00")
    },
    {
      id: "2", 
      invoiceNumber: "INV-2024-002",
      customerName: "テスト商事株式会社",
      amount: 85000,
      deletedAt: new Date("2024-01-14T15:20:00")
    },
    {
      id: "3",
      invoiceNumber: "INV-2024-003", 
      customerName: "例示企業合同会社",
      amount: 95000,
      deletedAt: new Date("2024-01-13T09:45:00")
    }
  ];

  const handleRestore = (id: string) => {
    console.log(`請求書 ${id} を復元`);
    // TODO: 復元処理の実装
  };

  const handlePermanentDelete = (id: string) => {
    console.log(`請求書 ${id} を完全削除`);
    // TODO: 完全削除処理の実装
  };

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
    <div>
      <style>{`
        .main-content {
          padding-top: 80px;
          padding-bottom: 80px;
        }
        .info-banner {
          background-color: #f8f9fa;
          border-left: 4px solid #6c757d;
          padding: 12px 20px;
          margin: 0;
          color: #6c757d;
          font-size: 14px;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
        }
        .table th {
          background-color: #f8f9fa;
          border-bottom: 2px solid #dee2e6;
          font-weight: 600;
        }
        .table td {
          vertical-align: middle;
        }
        `}
      </style>
      
      <div className="fixed-header-container">
        <nav className="navbar">
          <span className="navbar-brand mb-0 h5">ごみ箱</span>
        </nav>
      </div>
      

      
      <div className="main-content">
        <div className="info-banner">
          <i className="fas fa-info-circle me-2"></i>
          ごみ箱に移動された請求書は30日で削除されます。
        </div>
        <Container className="mt-3 mb-5">
          {trashedInvoices.length === 0 ? (
            <div className="text-center text-muted py-5">
              <i className="fas fa-trash fa-3x mb-3"></i>
              <p>削除された請求書はありません</p>
            </div>
          ) : (
            <div className="row">
              {trashedInvoices.map((invoice) => (
                <div key={invoice.id} className="col-12 mb-3">
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
                              onClick={() => handleRestore(invoice.id)}
                              className="me-2"
                            >
                              <i className="fas fa-undo me-1"></i>
                              戻す
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handlePermanentDelete(invoice.id)}
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
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};
