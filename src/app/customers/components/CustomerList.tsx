'use client';

import { useAppSelector } from "../../../hooks";
import { CustomerCard } from "./CustomerCard";

export const CustomerList = () => {
  const { customers } = useAppSelector((state) => state.customer);

  return (
    <div className="container mt-3 mb-5">
      {customers.map((customer) => (
        <CustomerCard
          key={customer.id}
          name={customer.name}
          phoneNumber={customer.phoneNumber}
          company={customer.company}
        />
      ))}
    </div>
  );
}; 