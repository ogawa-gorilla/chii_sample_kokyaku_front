'use client';

import { Invoice } from '@/types/invoice';
import { forwardRef } from 'react';

type Props = {
  invoice: Invoice;
};

const InvoiceDownloader = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        padding: '20mm',
        background: '#fff',
        width: '210mm',
        position: 'absolute',
        left: '-9999px'
      }}
    >
      <h1>請求書</h1>
      <p><strong>番号：</strong>{props.invoice.invoiceNumber}</p>
      <p><strong>請求日：</strong>{props.invoice.date}</p>
      <p><strong>請求先：</strong>{props.invoice.company}</p>
      <p><strong>担当者：</strong>{props.invoice.customerName}</p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }} border={1}>
        <thead>
          <tr>
            <th>商品名</th><th>数量</th><th>単価</th><th>金額</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>商品A</td><td>2</td><td>¥</td><td>¥</td>
          </tr>
          <tr>
            <td>商品B</td><td>1</td><td>¥</td><td>¥</td>
          </tr>
        </tbody>
      </table>
      <p style={{ textAlign: 'right', marginTop: 20 }}><strong>合計：¥{props.invoice.amount.toLocaleString()}</strong></p>
    </div>
  );
});

export default InvoiceDownloader;