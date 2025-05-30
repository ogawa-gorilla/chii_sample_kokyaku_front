import { Row, Col } from "react-bootstrap";
import { InvoiceCard } from "./InvoiceCard";

export const InvoiceCardList = () => {
  return (
    <div>
      <Row>
        <Col md={4} key="1">
          <InvoiceCard />
        </Col>
        <Col md={4} key="2">
          <InvoiceCard />
        </Col>
      </Row>
      
      
    </div>
  );
};
