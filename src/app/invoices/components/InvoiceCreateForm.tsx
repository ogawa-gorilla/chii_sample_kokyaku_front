import { useAppDispatch, useAppSelector } from '@/hooks'
import { startNewCustomer } from '@/store/features/customerSlice'
import { updateInvoiceDraft } from '@/store/features/invoiceSlice'
import { setCurrentPage } from '@/store/navigationSlice'
import { Invoice, InvoiceStatus } from '@/types/invoice'
import { Page } from '@/types/page'
import { Button, Container, Form } from 'react-bootstrap'
import { CustomerSelect } from './CustomerSelect'
import { StatusSelect } from './StatusSelect'

interface InvoiceCreateFormProps {
    onSubmit: (data: Partial<Invoice>) => void
}

export const InvoiceCreateForm = ({ onSubmit }: InvoiceCreateFormProps) => {
    const dispatch = useAppDispatch()
    const invoiceDraft = useAppSelector((state) => state.invoice.invoiceDraft)
    const customers = useAppSelector((state) => state.customer.customers)

    if (!invoiceDraft) {
        return null
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(invoiceDraft!)
    }

    const handleCreateCustomer = () => {
        dispatch(startNewCustomer())
        dispatch(setCurrentPage(Page.customerDetail))
    }

    const handleCustomerChange = (customerId: string) => {
        dispatch(updateInvoiceDraft({ ...invoiceDraft, customerId }))
    }

    const handleStatusChange = (status: InvoiceStatus) => {
        dispatch(updateInvoiceDraft({ ...invoiceDraft, status }))
    }

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
                        <Form.Label>
                            顧客<span className="text-danger">※必須</span>
                        </Form.Label>
                        <CustomerSelect
                            customers={customers}
                            selectedCustomerId={invoiceDraft.customerId}
                            onCustomerChange={handleCustomerChange}
                        />
                    </div>

                    <div className="mb-3">
                        <Form.Label>
                            請求日<span className="text-danger">※必須</span>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={invoiceDraft.date.split('/').join('-')}
                            onChange={(e) =>
                                dispatch(
                                    updateInvoiceDraft({
                                        date: e.target.value
                                            .split('-')
                                            .join('/'),
                                    })
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <Form.Label>
                            請求番号<span className="text-danger">※必須</span>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            value={invoiceDraft.invoiceNumber}
                            onChange={(e) =>
                                dispatch(
                                    updateInvoiceDraft({
                                        ...invoiceDraft,
                                        invoiceNumber: e.target.value,
                                    })
                                )
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <Form.Label>
                            金額<span className="text-danger">※必須</span>
                        </Form.Label>
                        <Form.Control
                            type="number"
                            value={invoiceDraft.amount}
                            onChange={(e) =>
                                dispatch(
                                    updateInvoiceDraft({
                                        ...invoiceDraft,
                                        amount: Number(e.target.value),
                                    })
                                )
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h6 className="card-title mb-3">支払い状況</h6>
                    <div className="mb-3">
                        <Form.Label>ステータス</Form.Label>
                        <StatusSelect
                            selectedStatus={invoiceDraft.status}
                            onStatusChange={handleStatusChange}
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
                            onClick={() =>
                                dispatch(setCurrentPage(Page.invoiceList))
                            }
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
    )
}
