'use client';

import { useAppDispatch } from "@/hooks";
import { Container } from "react-bootstrap";
import { DeletedInvoiceCard, TrashedInvoice } from "./components/DeletedInvoiceCard";

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
                <DeletedInvoiceCard
                  key={invoice.id}
                  invoice={invoice}
                  onRestore={handleRestore}
                  onPermanentDelete={handlePermanentDelete}
                />
              ))}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};
