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
  help: 'help',
}

type Tab = typeof Tab[keyof typeof Tab];

const footerButtons = (currentPage: Page) => {
  var tab: Tab;
  if (currentPage === Page.customerList || currentPage === Page.customerDetail || currentPage === Page.customerCreate || currentPage === Page.customerEdit) {
    tab = Tab.customer
  } else if (currentPage === Page.invoiceList || currentPage === Page.invoiceDetail || currentPage === Page.invoiceCreate || currentPage === Page.invoiceEdit) {
    tab = Tab.invoice
  } else if (currentPage === Page.help) {
    tab = Tab.help
  } else {
    tab = Tab.home
  }

return(
  <div className="fixed-footer d-flex justify-content-around py-2">
    <FooterButton icon="🏠" label="ホーム" isActive={tab === Tab.home} pageTo={Page.customerList} />
    <FooterButton icon="👤" label="顧客" isActive={tab === Tab.customer} pageTo={Page.customerList} />
    <FooterButton icon="🧾" label="請求書" isActive={tab === Tab.invoice} pageTo={Page.invoiceList} />
    <FooterButton icon="❓" label="ヘルプ" isActive={tab === Tab.help} pageTo={Page.help} />
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