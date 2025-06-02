import { useAppDispatch } from '@/hooks';
import { setSearchQuery, setSelectedCustomer } from '@/store/features/customerSlice';
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

  const handleCompanySearch = (e: React.MouseEvent, companyName: string) => {
    e.stopPropagation();
    dispatch(setSearchQuery(companyName));
  };

  return (
    <div
      className="customer-card bg-white shadow-sm p-3" 
      role="button"
      style={{ cursor: "pointer" }}
    >
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h5 className="mb-1">{props.name}</h5>
          <p className="mb-1 text-muted small">{props.nameReading}</p>
          <p className="mb-1 text-muted">📞 {props.phoneNumber}</p>
          {props.company && (
            <>
              <p className="mb-1 text-muted">{props.company}</p>
              <Button
                variant="link"
                className="p-0 ps-2 company-search-btn"
                onClick={(e) => handleCompanySearch(e, props.company!)}
                style={{ fontSize: '0.85rem', color: '#0d6efd' }}
              >
                🔍 この会社名で絞り込み
              </Button>
            </>
          )}
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
      <style jsx>{`
        .company-search-btn {
          display: inline-block;
          transition: opacity 0.2s;
        }
        .company-search-btn:hover {
          opacity: 0.7;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}; 