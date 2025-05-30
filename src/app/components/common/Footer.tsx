'use client';

import { FC } from 'react';
import { FooterButton } from './FooterButton';
import { useAppSelector } from '../../../hooks';
import { Page } from '../../../types/page';

type Page = typeof Page[keyof typeof Page];

const Tab = {
  home: 'home',
  customer: 'customer',
  invoice: 'invoice',
  setting: 'setting',
}

type Tab = typeof Tab[keyof typeof Tab];

const footerButtons = (currentPage: Page) => {
  var tab: Tab;
  if (currentPage === Page.customerList || currentPage === Page.customerDetail || currentPage === Page.customerCreate || currentPage === Page.customerEdit) {
    tab = Tab.customer
  } else {
    tab = Tab.home
  }

return(
  <div className="fixed-footer d-flex justify-content-around py-2">
    <FooterButton icon="🏠" label="ホーム" isActive={tab === Tab.home} />
    <FooterButton icon="👤" label="顧客" isActive={tab === Tab.customer} />
    <FooterButton icon="🧾" label="請求書" isActive={tab === Tab.invoice} />
    <FooterButton icon="⚙️" label="設定" isActive={tab === Tab.setting} />
  </div>
)
}

export const Footer: FC = () => {

  const currentPage = useAppSelector(state => state.navigation.currentPage)

  return (
    <div>
      {footerButtons(currentPage)}
    </div>
  );
}; 