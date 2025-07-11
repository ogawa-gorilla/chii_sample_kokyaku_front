'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import {
    setEndMonth,
    setSearchText,
    setShowUnpaidOnly,
    setSortOrder,
    setStartMonth,
    startNewInvoice,
} from '@/store/features/invoiceSlice'
import { setCurrentPage } from '@/store/navigationSlice'
import { Page } from '@/types/page'
import { Button, Container, Form } from 'react-bootstrap'
import { InvoiceCardList } from './components/InvoiceCardList'

export const InvoiceIndexPage = () => {
    const dispatch = useAppDispatch()
    const searchText = useAppSelector((state) => state.invoice.searchText)
    const showUnpaidOnly = useAppSelector(
        (state) => state.invoice.showUnpaidOnly
    )
    const startMonth = useAppSelector((state) => state.invoice.startMonth)
    const endMonth = useAppSelector((state) => state.invoice.endMonth)
    const sortOrder = useAppSelector((state) => state.invoice.sortOrder)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchText(e.target.value))
    }

    const toggleSortOrder = () => {
        dispatch(setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'))
    }

    const handleCreateInvoice = () => {
        dispatch(startNewInvoice())
        setTimeout(() => {
            dispatch(setCurrentPage(Page.invoiceCreate))
        }, 0)
    }

    return (
        <div>
            <style>
                {`
        .search-area {
          padding: 1rem;
          background: white;
          border-bottom: 1px solid #eee;
        }
        .main-content {
          padding-top: 240px;
          padding-bottom: 80px;
        }
        .month-picker-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .month-picker {
          width: 140px;
        }
        .sort-button {
          display: block;
        }
        `}
            </style>

            <div className="fixed-header-container">
                <nav className="navbar">
                    <span className="navbar-brand mb-0 h5">請求書一覧</span>
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={handleCreateInvoice}
                    >
                        ＋新規登録
                    </Button>
                </nav>
                <div className="search-area">
                    <Container>
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder="名前・会社名・番号で検索"
                                value={searchText}
                                onChange={handleSearch}
                            />
                        </Form>
                        <Form>
                            <div
                                className="mt-2 mb-2 d-flex align-items-center"
                                style={{
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                }}
                                onClick={() =>
                                    dispatch(setShowUnpaidOnly(!showUnpaidOnly))
                                }
                            >
                                <Form.Check
                                    type="checkbox"
                                    checked={showUnpaidOnly}
                                    onChange={() => {}}
                                    style={{ pointerEvents: 'none' }}
                                />
                                <span className="ms-2">未払いのみ表示</span>
                            </div>
                        </Form>
                        <Form>
                            <div className="month-picker-container">
                                <Form.Control
                                    type="month"
                                    value={startMonth}
                                    onChange={(e) =>
                                        dispatch(setStartMonth(e.target.value))
                                    }
                                    className="month-picker"
                                />
                                <span>～</span>
                                <Form.Control
                                    type="month"
                                    value={endMonth}
                                    onChange={(e) =>
                                        dispatch(setEndMonth(e.target.value))
                                    }
                                    className="month-picker"
                                />
                            </div>
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={toggleSortOrder}
                                className="sort-button"
                            >
                                {sortOrder === 'asc'
                                    ? '▲ 古い順'
                                    : '▼ 新しい順'}
                            </Button>
                        </Form>
                    </Container>
                </div>
            </div>
            <div className="main-content">
                <Container className="mt-3 mb-5">
                    <InvoiceCardList />
                </Container>
            </div>
        </div>
    )
}
