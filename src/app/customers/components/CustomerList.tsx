'use client';

import { useAppSelector } from "@/hooks";
import { selectFilteredCustomers } from "@/store/features/customerSlice";
import { Col, Row } from "react-bootstrap";
import { CustomerCard } from "./CustomerCard";

export const CustomerList = () => {
  const filteredCustomers = useAppSelector(selectFilteredCustomers);

  return (
    <div className="container mt-3 mb-5">
      <Row>
      {filteredCustomers.map((customer) => (
        <Col
          md={4}
          key={customer.id}
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
    </div>
  );
}; 