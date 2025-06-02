'use client';

import { useAppSelector } from "@/hooks";
import { Page } from "@/types/page";
import { Footer } from "./components/common/Footer";
import CustomerDetailPage from "./customers/CustomerDetailPage";
import CustomerIndexPage from "./customers/CustomerIndexPage";
import HomePage from "./customers/HomePage";
import { InvoiceDetailPage } from "./invoices/InvoiceDetailPage";
import { InvoiceIndexPage } from "./invoices/InvoiceIndexPage";

const showPage = (currentPage: Page) => {
  switch (currentPage) {
    case Page.home:
      return <HomePage />
    case Page.customerList:
      return <CustomerIndexPage />;
    case Page.customerDetail:
      return <CustomerDetailPage />;
    case Page.invoiceList:
      return <InvoiceIndexPage />;
    case Page.invoiceDetail:
      return <InvoiceDetailPage />;
  }
}

export default function Home() {
  const currentPage = useAppSelector(state => state.navigation.currentPage);

  return (
    <div className="app-container">
      <style>
        {`
          .app-container {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            position: relative;
          }
          .main-container {
            flex: 1;
          }
        `}
      </style>
      <div className="main-container">
        {showPage(currentPage)}
      </div>
      <Footer />
    </div>
  );
}
