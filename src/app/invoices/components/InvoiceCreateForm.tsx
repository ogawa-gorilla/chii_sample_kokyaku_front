import { useAppDispatch, useAppSelector } from "@/hooks";
import { updateInvoiceDraft } from "@/store/features/invoiceSlice";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { Page } from "@/types/page";
import { normalizeForSearch } from "@/utils/japanese";
import { Button, Container, Form } from "react-bootstrap";
import Select, { components, FilterOptionOption } from 'react-select';

interface CustomerOption {
  value: string;
  label: string;
  nameReading: string;
  company?: string;
}

interface InvoiceCreateFormProps {
  invoice: Invoice;
  onSubmit: (data: Partial<Invoice>) => void;
}

const CustomOption = ({ children, ...props }: any) => {
  const { nameReading, company } = props.data;
  return (
    <components.Option {...props}>
      <div>
        <div>{children}</div>
        <div className="text-muted small">{company || '会社名なし'}</div>
      </div>
    </components.Option>
  );
};

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
  const customers = useAppSelector(state => state.customer.customers);
  const invoiceDraft = useAppSelector(state => state.invoice.invoiceDraft);

  if (!invoiceDraft) {
    return null;
  }

  const customerOptions: CustomerOption[] = customers.map(customer => ({
    value: customer.id,
    label: `${customer.name} (${customer.nameReading})`,
    nameReading: customer.nameReading,
    company: customer.company
  }));

  const selectedCustomer = customerOptions.find(option => option.value === invoiceDraft?.customerId);

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

  const filterCustomerOption = (
    option: FilterOptionOption<CustomerOption>,
    inputValue: string
  ) => {
    const searchText = normalizeForSearch(inputValue.toLowerCase());
    const nameMatch = option.label.toLowerCase().includes(searchText);
    const nameReadingMatch = normalizeForSearch(option.data.nameReading.toLowerCase()).includes(normalizeForSearch(searchText));
    const companyMatch = option.data.company ? 
      option.data.company.toLowerCase().includes(searchText) : false;
    
    return nameMatch || nameReadingMatch || companyMatch;
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
            <div className="d-flex gap-2">
              <div style={{ flex: 1 }}>
                <Select
                  value={selectedCustomer}
                  onChange={(option) => updateInvoiceDraft({ ...invoiceDraft, customerId: option?.value || '' })}
                  options={customerOptions}
                  components={{ Option: CustomOption }}
                  filterOption={filterCustomerOption}
                  isClearable
                  placeholder="顧客を検索..."
                  noOptionsMessage={() => "該当する顧客がいません"}
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused ? '#80bdff' : '#ced4da',
                      boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(0,123,255,.25)' : 'none',
                      '&:hover': {
                        borderColor: state.isFocused ? '#80bdff' : '#ced4da'
                      }
                    }),
                    option: (base) => ({
                      ...base,
                      padding: '8px 12px'
                    })
                  }}
                />
              </div>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleCreateCustomer}
              >
                <i className="bi bi-plus"></i> 新規顧客
              </Button>
            </div>
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
              onChange={(option) => updateInvoiceDraft({ ...invoiceDraft, status: option?.value || InvoiceStatus.UNPAID })}
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