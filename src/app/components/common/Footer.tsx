'use client';

import { FC } from 'react';

export const Footer: FC = () => {
  return (
    <div className="fixed-footer d-flex justify-content-around py-2">
      <div className="text-center text-muted">
        <div>🏠</div>
        <small>ホーム</small>
      </div>
      <div className="text-center text-primary">
        <div>👤</div>
        <small>顧客</small>
      </div>
      <div className="text-center text-muted">
        <div>📅</div>
        <small>予定</small>
      </div>
      <div className="text-center text-muted">
        <div>⚙️</div>
        <small>設定</small>
      </div>
    </div>
  );
}; 