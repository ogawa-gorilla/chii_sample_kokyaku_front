import { FC } from 'react';
import { Button } from 'react-bootstrap';

interface CustomerCardProps {
  name: string;
  phoneNumber: string;
  company?: string;
  onDetailClick?: () => void;
}

export const CustomerCard: FC<CustomerCardProps> = ({
  name,
  phoneNumber,
  company,
  onDetailClick,
}) => {
  return (
    <div 
      className="customer-card bg-white shadow-sm p-3" 
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{name}</h5>
          <p className="mb-1 text-muted">📞 {phoneNumber}</p>
          {company && <p className="mb-0 text-muted">{company}</p>}
        </div>
        <Button
          variant="outline-primary"
          onClick={(e) => {
            e.stopPropagation();
            onDetailClick?.();
          }}
        >
          詳細
        </Button>
      </div>
    </div>
  );
}; 