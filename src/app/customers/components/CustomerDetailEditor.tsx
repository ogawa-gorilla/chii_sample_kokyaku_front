import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateDraft } from '@/store/features/customerSlice';
import { Customer } from '@/types/customer';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Form } from 'react-bootstrap';

interface CustomerDetailEditorProps {
  originalCustomer?: Customer;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CustomerDetailEditor({ originalCustomer: originalCustomer, onSubmit }: CustomerDetailEditorProps) {
  const dispatch = useAppDispatch();
  const draftCustomer = useAppSelector(state => state.customer.draftCustomer);
  const customers = useAppSelector(state => state.customer.customers);
  const invoices = useAppSelector(state => state.invoice.invoices);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [companyInput, setCompanyInput] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);
  const companyInputRef = useRef<HTMLInputElement>(null);

  // draftCustomerが変更されたときにcompanyInputを更新
  useEffect(() => {
    if (draftCustomer) {
      setCompanyInput(draftCustomer.company || '');
    }
  }, [draftCustomer]);

  // 会社名の一覧を生成（重複を除去）- useMemoで最適化
  const allCompanies = useMemo(() => {
    return Array.from(new Set([
      ...customers.map(c => c.company).filter((c): c is string => !!c),
      ...invoices.map(i => i.company).filter((c): c is string => !!c)
    ])).sort((a, b) => a.localeCompare(b, 'ja'));
  }, [customers, invoices]);

  // 入力値に基づいて会社名をフィルタリング
  useEffect(() => {
    const filtered = allCompanies.filter(company =>
      company.toLowerCase().includes(companyInput.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [companyInput, allCompanies]);

  const handleChange = (field: keyof Customer, value: string) => {
    dispatch(updateDraft({ [field]: value }));
  };

  const handleCompanyInputChange = (value: string) => {
    setCompanyInput(value);
    handleChange('company', value);
    setShowSuggestions(true);
  };

  const handleCompanySelect = (company: string) => {
    setCompanyInput(company);
    handleChange('company', company);
    setShowSuggestions(false);
  };

  // クリック以外の場所をクリックしたときにサジェストを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companyInputRef.current && !companyInputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!draftCustomer) return null;

  const isFieldChanged = (field: keyof Customer) => {
    if (!originalCustomer){
      return draftCustomer[field] !== '';
    }
    return draftCustomer[field] !== originalCustomer[field];
  };

  const getLabelClassName = (field: keyof Customer) => {
    return `form-label ${isFieldChanged(field) ? 'modified' : ''}`;
  };

  const getLabelText = (field: keyof Customer, label: string) => {
    return `${label}${isFieldChanged(field) ? ' *' : ''}`;
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('name')}>
              {getLabelText('name', '名前')} <span className="text-danger">※必須</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={draftCustomer.name}
              onChange={(e) => handleChange('name', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('nameReading')}>
              {getLabelText('nameReading', 'フリガナ')} <span className="text-danger">※必須</span>
            </Form.Label>
            <Form.Control
              type="text"
              value={draftCustomer.nameReading}
              onChange={(e) => handleChange('nameReading', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={getLabelClassName('phoneNumber')}>
              {getLabelText('phoneNumber', '電話番号')} <span className="text-danger">※必須</span>
            </Form.Label>
            <Form.Control
              type="tel"
              value={draftCustomer.phoneNumber}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" style={{ position: 'relative' }} ref={companyInputRef}>
            <Form.Label className={getLabelClassName('company')}>
              {getLabelText('company', '会社名')}
            </Form.Label>
            <Form.Control
              type="text"
              value={companyInput}
              onChange={(e) => handleCompanyInputChange(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              placeholder="未設定"
              required={false}
            />
            {showSuggestions && filteredCompanies.length > 0 && (
              <div className="company-suggestions">
                {filteredCompanies.map((company, index) => (
                  <div
                    key={index}
                    className="company-suggestion-item"
                    onClick={() => handleCompanySelect(company)}
                  >
                    {company}
                  </div>
                ))}
              </div>
            )}
          </Form.Group>
        </Form>
      </Card.Body>
      <style jsx>{`
        .company-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 1px solid #ced4da;
          border-radius: 4px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 9999;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .company-suggestion-item {
          padding: 8px 12px;
          cursor: pointer;
        }
        .company-suggestion-item:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </Card>
  );
} 