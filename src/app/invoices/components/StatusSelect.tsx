import { InvoiceStatus } from "@/types/invoice";
import Select, { components } from 'react-select';

interface StatusSelectProps {
  selectedStatus: InvoiceStatus;
  onStatusChange: (status: InvoiceStatus) => void;
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

export const StatusSelect = ({ selectedStatus, onStatusChange }: StatusSelectProps) => {
  const statusOptions = [
    { value: InvoiceStatus.UNPAID, label: '未払い' },
    { value: InvoiceStatus.PAID, label: '支払い済み' }
  ];

  const selectedOption = statusOptions.find(option => option.value === selectedStatus);

  return (
    <Select
      value={selectedOption}
      onChange={(option) => onStatusChange(option?.value || InvoiceStatus.UNPAID)}
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
  );
}; 