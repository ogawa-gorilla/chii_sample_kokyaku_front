'use client';

import { FC } from 'react';
import { FooterButton } from './FooterButton';

export const Footer: FC = () => {
  return (
    <div className="fixed-footer d-flex justify-content-around py-2">
      <FooterButton icon="🏠" label="ホーム" />
      <FooterButton icon="👤" label="顧客" isActive={true} />
      <FooterButton icon="📅" label="予定" />
      <FooterButton icon="⚙️" label="設定" />
    </div>
  );
}; 