import { FC } from 'react';

interface FooterButtonProps {
  icon: string;
  label: string;
  isActive?: boolean;
}

export const FooterButton: FC<FooterButtonProps> = ({ icon, label, isActive = false }) => {
  return (
    <div className={`text-center ${isActive ? 'text-primary' : 'text-muted'}`}>
      <div>{icon}</div>
      <small>{label}</small>
    </div>
  );
}; 