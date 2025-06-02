import { useAppSelector } from "@/hooks";
import { Col, Row } from "react-bootstrap";
import { InvoiceCard } from "./InvoiceCard";

export const InvoiceCardList = () => {

  const invoices = useAppSelector(state => state.invoice  .invoices);

  return (
    <div>
      <Row>
        {invoices.map(invoice =>
          <Col md={4} key={invoice.id}>
            <InvoiceCard invoice={invoice} />
        </Col>
        )}
      </Row>
      
      
    </div>
  );
};
