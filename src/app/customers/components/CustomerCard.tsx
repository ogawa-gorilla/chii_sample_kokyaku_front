import { FC } from 'react';

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  company?: string;
}

export const CustomerCard: FC<CustomerCardProps> = ({
  name,
  phoneNumber,
  company,
}) => {
  return (
    <div 
      className="customer-card bg-white shadow-sm" 
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between">
        <h5 className="mb-1">{name}</h5>
      </div>
      <p className="mb-1 text-muted">📞 {phoneNumber}</p>
      {company && <p className="mb-1 text-muted">{company}</p>}
    </div>
  );
}; 