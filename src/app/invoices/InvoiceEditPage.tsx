import { useAppDispatch } from "@/hooks";
import { saveInvoice } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice } from "@/types/invoice";
import { Page } from "@/types/page";
import { Container } from "react-bootstrap";
import { InvoiceEditForm } from "./components/InvoiceEditForm";
export const InvoiceEditPage = () => {

  const dispatch = useAppDispatch();

  const handleSubmit = (data: Partial<Invoice>) => {
    dispatch(saveInvoice(data));
    dispatch(setCurrentPage(Page.invoiceDetail));
  }

  return (
    <div>
      <style>
        {`
        .main-content {
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 200px; /* フッターの高さ分 */
        }
        `}
      </style>
      <div className="fixed-header-container">
          <nav className="navbar">
            <span className="navbar-brand mb-0 h5">請求書編集</span>
          </nav>
      </div>
      <Container className="main-content">
        <InvoiceEditForm onSubmit={handleSubmit}/>
      </Container>
    </div>
  );
};
