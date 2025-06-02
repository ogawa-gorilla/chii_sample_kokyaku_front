import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentPage } from "@/store/navigationSlice";
import { Invoice, InvoiceStatus } from "@/types/invoice";
import { Page } from "@/types/page";
import { normalizeForSearch } from "@/utils/japanese";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Select, { components, FilterOptionOption } from 'react-select';

interface CustomerOption {
  value: string;
  label: string;
  nameReading: string;
  company?: string;
}

interface InvoiceEditFormProps {
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

export const InvoiceEditForm = ({ invoice, onSubmit }: InvoiceEditFormProps) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const customers = useAppSelector(state => state.customer.customers);
  const [formData, setFormData] = useState<Partial<Invoice>>({
    customerId: invoice.customerId,
    date: invoice.date,
    invoiceNumber: invoice.invoiceNumber,
    amount: invoice.amount,
    status: invoice.status
  });

  const customerOptions: CustomerOption[] = customers.map(customer => ({
    value: customer.id,
    label: `${customer.name} (${customer.nameReading})`,
    nameReading: customer.nameReading,
    company: customer.company
  }));

  const selectedCustomer = customerOptions.find(option => option.value === formData.customerId);

  const statusOptions = [
    { value: InvoiceStatus.UNPAID, label: '未払い' },
    { value: InvoiceStatus.PAID, label: '支払い済み' }
  ];

  const selectedStatus = statusOptions.find(option => option.value === formData.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
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
      <div className="card mb-4">
        <div className="card-body">
          <h6 className="card-title mb-3">支払い状況</h6>
          <div className="mb-3">
            <Form.Label>ステータス</Form.Label>
            <Select
              value={selectedStatus}
              onChange={(option) => setFormData({ ...formData, status: option?.value || InvoiceStatus.UNPAID })}
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

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="card-title mb-0">基本情報</h6>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'ロック' : '情報修正'}
            </Button>
          </div>

          <div className="mb-3">
            <Form.Label>顧客</Form.Label>
            <div className="d-flex gap-2">
              <div style={{ flex: 1 }}>
                <Select
                  isDisabled={!isEditing}
                  value={selectedCustomer}
                  onChange={(option) => setFormData({ ...formData, customerId: option?.value || '' })}
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
              disabled={!isEditing}
              value={formData.date?.split('/').join('-')}
              onChange={(e) => setFormData({ ...formData, date: e.target.value.split('-').join('/') })}
            />
          </div>

          <div className="mb-3">
            <Form.Label>請求番号</Form.Label>
            <Form.Control
              type="text"
              disabled={!isEditing}
              value={formData.invoiceNumber}
              onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <Form.Label>金額</Form.Label>
            <Form.Control
              type="number"
              disabled={!isEditing}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="fixed-bottom p-3 bg-white border-top" style={{ marginBottom: '60px' }}>
        <div className="container d-grid">
          <Button type="submit" variant="primary">
            保存
          </Button>
        </div>
      </div>
    </Form>
  );
}; 