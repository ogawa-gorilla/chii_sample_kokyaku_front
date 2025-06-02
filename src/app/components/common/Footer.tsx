'use client';

import { useAppSelector } from '@/hooks';
import { Page } from '@/types/page';
import { FC } from 'react';
import { FooterButton } from './FooterButton';

const Tab = {
  home: 'home',
  customer: 'customer',
  invoice: 'invoice',
  help: 'help',
}

type Tab = typeof Tab[keyof typeof Tab];

const footerButtons = (currentPage: Page) => {
  var tab: Tab;
  if (currentPage === Page.customerList || currentPage === Page.customerDetail) {
    tab = Tab.customer
  } else if (currentPage === Page.invoiceList || currentPage === Page.invoiceDetail) {
    tab = Tab.invoice
  } else {
    tab = Tab.home
  }

return(
  <div className="fixed-footer d-flex justify-content-around py-2">
    <FooterButton icon="🏠" label="ホーム" isActive={tab === Tab.home} pageTo={Page.home} />
    <FooterButton icon="👤" label="顧客" isActive={tab === Tab.customer} pageTo={Page.customerList} />
    <FooterButton icon="🧾" label="請求書" isActive={tab === Tab.invoice} pageTo={Page.invoiceList} />
  </div>
)
}

export const Footer: FC = () => {
  const currentPage = useAppSelector(state => state.navigation.currentPage)

  return (
    <div>
      <style>
        {`
          .fixed-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
            z-index: 900;
          }
          .fixed-footer a {
            text-decoration: none;
            color: inherit;
          }
          .fixed-footer a:hover {
            text-decoration: none;
          }
        `}
      </style>
      {footerButtons(currentPage)}
    </div>
  );
}; 