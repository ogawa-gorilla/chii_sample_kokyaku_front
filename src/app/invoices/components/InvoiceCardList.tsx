import { useAppSelector } from "@/hooks";
import { selectFilteredInvoices } from "@/store/features/invoiceSlice";
import { Col, Row } from "react-bootstrap";
import { InvoiceCard } from "./InvoiceCard";

export const InvoiceCardList = () => {
  const filteredInvoices = useAppSelector(selectFilteredInvoices);

  return (
    <div>
      <Row>
        {filteredInvoices.map(invoice =>
          <Col md={4} key={invoice.id}>
            <InvoiceCard invoice={invoice} />
          </Col>
        )}
      </Row>
    </div>
  );
};
