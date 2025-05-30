'use client';

import { FC } from 'react';
import Link from 'next/link';

export const Footer: FC = () => {
  return (
    <div className="fixed-footer d-flex justify-content-around py-2">
      <Link href="/" className="text-center text-muted">
        <div>🏠</div>
        <small>ホーム</small>
      </Link>
      <Link href="/customers" className="text-center text-primary">
        <div>👤</div>
        <small>顧客</small>
      </Link>
      <Link href="/schedule" className="text-center text-muted">
        <div>📅</div>
        <small>予定</small>
      </Link>
      <Link href="/settings" className="text-center text-muted">
        <div>⚙️</div>
        <small>設定</small>
      </Link>
    </div>
  );
}; 