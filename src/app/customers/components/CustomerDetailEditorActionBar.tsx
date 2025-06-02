import { useAppDispatch, useAppSelector } from '@/hooks';
import { cancelEditing } from '@/store/features/customerSlice';
import { setCurrentPage } from '@/store/navigationSlice';
import { Page } from '@/types/page';
import { Button, Container } from 'react-bootstrap';

interface CustomerDetailEditorActionBarProps {
  onSubmit: (e: React.FormEvent) => void;
}

export default function CustomerDetailEditorActionBar({ onSubmit }: CustomerDetailEditorActionBarProps) {
  const dispatch = useAppDispatch();
  const isEditing = useAppSelector(state => state.customer.editing);

  const handleCancel = () => {
    dispatch(cancelEditing());
    if (isEditing) {
      dispatch(setCurrentPage(Page.customerDetail));
    } else {
      dispatch(setCurrentPage(Page.customerList));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <div className="action-bar">
      <Container>
        <div className="action-buttons">
          <Button 
            variant="secondary"
            className="action-button"
            onClick={handleCancel}
          >
            キャンセル
          </Button>
          <Button 
            variant="primary"
            className="action-button"
            onClick={handleSubmit}
            type="submit"
          >
            保存
          </Button>
        </div>
      </Container>
    </div>
  );
} 