import { Customer } from "@/types/customer";
import { normalizeForSearch } from "@/utils/japanese";
import { Button } from "react-bootstrap";
import Select, { components, FilterOptionOption } from 'react-select';

interface CustomerOption {
  value: string;
  label: string;
  nameReading: string;
  company?: string;
}

interface CustomerSelectProps {
  customers: Customer[];
  selectedCustomerId: string;
  onCustomerChange: (customerId: string) => void;
  onCreateCustomer: () => void;
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

export const CustomerSelect = ({ 
  customers, 
  selectedCustomerId, 
  onCustomerChange, 
  onCreateCustomer 
}: CustomerSelectProps) => {
  const customerOptions: CustomerOption[] = customers.map(customer => ({
    value: customer.id,
    label: `${customer.name} (${customer.nameReading})`,
    nameReading: customer.nameReading,
    company: customer.company
  }));

  const selectedCustomer = customerOptions.find(option => option.value === selectedCustomerId);

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
    <div className="d-flex gap-2">
      <div style={{ flex: 1 }}>
        <Select
          value={selectedCustomer}
          onChange={(option) => onCustomerChange(option?.value || '')}
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
        onClick={onCreateCustomer}
      >
        <i className="bi bi-plus"></i> 新規顧客
      </Button>
    </div>
  );
}; 