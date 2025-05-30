'use client';

import CustomerIndexPage from "./customers/CustomerIndexPage";
import { Footer } from "./components/common/Footer";
import { Page } from "../types/page";
import CustomerDetailPage from "./customers/CustomerDetailPage";
import { useAppSelector } from "../hooks";
import HelpPage from "./customers/HelpPage";
import { InvoiceIndexPage } from "./invoices/InvoiceIndexPage";
import { InvoiceDetailPage } from "./invoices/InvoiceDetailPage";

const showPage = (currentPage: Page) => {
  switch (currentPage) {
    case Page.customerList:
      return <CustomerIndexPage />;
    case Page.customerDetail:
      return <CustomerDetailPage />;
    case Page.invoiceList:
      return <InvoiceIndexPage />;
    case Page.invoiceDetail:
      return <InvoiceDetailPage />;
    case Page.help:
      return <HelpPage />;
  }
}

export default function Home() {

  const currentPage = useAppSelector(state => state.navigation.currentPage);

  return (
    <div>
    {showPage(currentPage)}
    <Footer />
    </div>
  );
}
