'use client';

import { useAppSelector } from "../../../hooks";
import { selectFilteredCustomers } from "../../../store/features/customerSlice";
import { CustomerCard } from "./CustomerCard";

export const CustomerList = () => {
  const filteredCustomers = useAppSelector(selectFilteredCustomers);

  return (
    <div className="container mt-3 mb-5">
      {filteredCustomers.map((customer) => (
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