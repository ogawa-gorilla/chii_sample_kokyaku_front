import { useAppDispatch } from '@/hooks';
import { setSelectedCustomer } from '@/store/features/customerSlice';
import { setCurrentPage } from '@/store/navigationSlice';
import { Page } from '@/types/page';
import { FC } from 'react';
import { Button } from 'react-bootstrap';

interface CustomerCardProps {
  id: string;
  name: string;
  nameReading: string;
  phoneNumber: string;
  company?: string;
}

export const CustomerCard: FC<CustomerCardProps> = (props: CustomerCardProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="customer-card bg-white shadow-sm p-3" 
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5 className="mb-1">{props.name}</h5>
          <p className="mb-1 text-muted small">{props.nameReading}</p>
          <p className="mb-1 text-muted">📞 {props.phoneNumber}</p>
          {props.company && <p className="mb-0 text-muted">{props.company}</p>}
        </div>
        <Button
          variant="outline-primary"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(setSelectedCustomer(props.id));
            dispatch(setCurrentPage(Page.customerDetail));
          }}
        >
          詳細
        </Button>
      </div>
    </div>
  );
}; 