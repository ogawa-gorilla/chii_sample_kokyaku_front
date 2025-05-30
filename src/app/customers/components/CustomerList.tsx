'use client';

import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../../hooks";
import { selectFilteredCustomers } from "../../../store/features/customerSlice";
import { CustomerCard } from "./CustomerCard";

export const CustomerList = () => {
  const filteredCustomers = useAppSelector(selectFilteredCustomers);

  return (
    <Row className="container mt-3 mb-5">
      {filteredCustomers.map((customer) => (
        <Col
          md={4}
        >
          <CustomerCard
            id={customer.id}
            name={customer.name}
            phoneNumber={customer.phoneNumber}
            company={customer.company}
        />
        </Col>
      ))}
    </Row>
  );
}; 