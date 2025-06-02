import { useAppDispatch } from '@/hooks';
import { setCurrentPage } from '@/store/navigationSlice';
import { Page } from '@/types/page';
import { FC } from 'react';

interface FooterButtonProps {
  icon: string;
  label: string;
  pageTo: Page;
  isActive?: boolean;
}

export const FooterButton: FC<FooterButtonProps> = ({ icon, label, pageTo, isActive = false }) => {

  const dispatch = useAppDispatch();

  return (
    <div 
      className={`text-center py-1 ${isActive ? 'text-primary active-footer-button' : 'text-muted'}`} 
      onClick={() => dispatch(setCurrentPage(pageTo))}
    >
      <style>
        {`
          .active-footer-button {
            background-color: rgba(13, 110, 253, 0.1);
          }
        `}
      </style>
      <div>{icon}</div>
      <small>{label}</small>
    </div>
  );
}; 