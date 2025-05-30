import { FC } from 'react';
import { Page } from '../../../types/page';
import { useAppDispatch } from '../../../hooks';
import { setCurrentPage } from '../../../store/navigationSlice';

interface FooterButtonProps {
  icon: string;
  label: string;
  pageTo: Page;
  isActive?: boolean;
}

export const FooterButton: FC<FooterButtonProps> = ({ icon, label, pageTo, isActive = false }) => {

  const dispatch = useAppDispatch();

  return (
    <div className={`text-center ${isActive ? 'text-primary' : 'text-muted'}`} onClick={() => dispatch(setCurrentPage(pageTo))}>
      <div>{icon}</div>
      <small>{label}</small>
    </div>
  );
}; 