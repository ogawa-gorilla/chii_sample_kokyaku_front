import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateInvoiceDraft } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { Page } from "@/types/page";
import { Button, Container, Form } from "react-bootstrap";
import Select, { components } from 'react-select';
import { CustomerSelect } from "./CustomerSelect";

interface InvoiceCreateFormProps {
  invoice: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
}

const StatusOption = ({ children, ...props }: any) => {
  const bgClass = props.data.value === InvoiceStatus.PAID ? 'bg-success bg-opacity-10' : 'bg-warning bg-opacity-10';
  return (
    <components.Option {...props}>
      <div className={bgClass} style={{ margin: '-8px -12px', padding: '8px 12px' }}>
        {children}
      </div>
    </components.Option>
  );
};

const StatusSingleValue = ({ children, ...props }: any) => {
  const bgClass = props.data.value === InvoiceStatus.PAID ? 'bg-success bg-opacity-10' : 'bg-warning bg-opacity-10';
  return (
    <components.SingleValue {...props}>
      <div className={bgClass} style={{ margin: '-4px -8px', padding: '4px 8px', borderRadius: '4px' }}>
        {children}
      </div>
    </components.SingleValue>
  );
};

export const InvoiceCreateForm = ({ onSubmit }: InvoiceCreateFormProps) => {
  const dispatch = useAppDispatch();
  const invoiceDraft = useAppSelector(state => state.invoice.invoiceDraft);
  const customers = useAppSelector(state => state.customer.customers);

  if (!invoiceDraft) {
    return null;
  }

  const statusOptions = [
    { value: InvoiceStatus.UNPAID, label: '未払い' },
    { value: InvoiceStatus.PAID, label: '支払い済み' }
  ];

  const selectedStatus = statusOptions.find(option => option.value === invoiceDraft?.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(invoiceDraft!);
  };

  const handleCreateCustomer = () => {
    dispatch(setCurrentPage(Page.customerDetail));
  };

  const handleCustomerChange = (customerId: string) => {
    dispatch(updateInvoiceDraft({ ...invoiceDraft, customerId }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <style>
        {`
          .action-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            padding: 1rem;
            box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
            z-index: 1000;
            margin-bottom: 60px;
          }
          .action-buttons {
            display: grid;
            grid-template-rows: auto auto;
            gap: 1rem;
          }
          .action-button {
            width: 100%;
            padding: 0.8rem;
          }
        `}
      </style>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="card-title mb-0">基本情報</h6>
          </div>
          <div className="mb-3">
            <Form.Label>顧客</Form.Label>
            <CustomerSelect
              customers={customers}
              selectedCustomerId={invoiceDraft.customerId}
              onCustomerChange={handleCustomerChange}
              onCreateCustomer={handleCreateCustomer}
            />
          </div>

          <div className="mb-3">
            <Form.Label>請求日</Form.Label>
            <Form.Control
              type="date"
              value={invoiceDraft.date.split('/').join('-')}
              onChange={(e) => dispatch(updateInvoiceDraft({ date: e.target.value.split('-').join('/') }))}
            />
          </div>

          <div className="mb-3">
            <Form.Label>請求番号</Form.Label>
            <Form.Control
              type="text"
              value={invoiceDraft.invoiceNumber}
              onChange={(e) => dispatch(updateInvoiceDraft({ ...invoiceDraft, invoiceNumber: e.target.value }))}
            />
          </div>

          <div className="mb-3">
            <Form.Label>金額</Form.Label>
            <Form.Control
              type="number"
              value={invoiceDraft.amount}
              onChange={(e) => dispatch(updateInvoiceDraft({ ...invoiceDraft, amount: Number(e.target.value) }))}
            />
          </div>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title mb-3">支払い状況</h6>
          <div className="mb-3">
            <Form.Label>ステータス</Form.Label>
            <Select
              value={selectedStatus}
              onChange={(option) => dispatch(updateInvoiceDraft({ ...invoiceDraft, status: option?.value || InvoiceStatus.UNPAID }))}
              options={statusOptions}
              components={{
                Option: StatusOption,
                SingleValue: StatusSingleValue
              }}
              styles={{
                control: (base) => ({
                  ...base,
                  minHeight: '38px'
                }),
                option: (base) => ({
                  ...base,
                  padding: 0
                }),
                singleValue: (base) => ({
                  ...base,
                  padding: 0
                })
              }}
            />
          </div>
        </div>
      </div>

      <div className="action-bar">
        <Container>
          <div className="action-buttons">
            <Button 
              variant="secondary"
              className="action-button"
              onClick={() => dispatch(setCurrentPage(Page.invoiceDetail))}
            >
              キャンセル
            </Button>
            <Button 
              variant="primary"
              className="action-button"
              type="submit"
            >
              保存
            </Button>
          </div>
        </Container>
      </div>
    </Form>
  );
}; 