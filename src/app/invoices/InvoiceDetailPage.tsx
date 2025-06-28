'use client'

import { useAppDispatch, useAppSelector } from '@/hooks'
import { startEditInvoice, trashInvoice } from '@/store/features/invoiceSlice'
import { setCurrentPage } from '@/store/navigationSlice'
import { Page } from '@/types/page'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { useRef, useState } from 'react'
import { Button, Container, Modal } from 'react-bootstrap'
import { InvoiceDetailCard } from './components/InvoiceDetailCard'
import InvoiceDownloader from './components/InvoiceDownloader'

export const InvoiceDetailPage = () => {
    const dispatch = useAppDispatch()
    const selectedInvoiceId = useAppSelector(
        (state) => state.invoice.selectedInvoiceId
    )
    const invoice = useAppSelector((state) =>
        state.invoice.invoices.find((c) => c.id === selectedInvoiceId)
    )
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const invoiceRef = useRef<HTMLDivElement>(null)

    const handleEdit = () => {
        dispatch(startEditInvoice(invoice!.id))
        dispatch(setCurrentPage(Page.invoiceEdit))
    }

    const handleDelete = () => {
        setShowDeleteModal(true)
    }

    const handleDownloadPDF = async () => {
        const element = invoiceRef.current
        if (!element) return

        const canvas = await html2canvas(element, { scale: 2 })
        const imgData = canvas.toDataURL('image/png')

        const pdf = new jsPDF('p', 'mm', 'a4')
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)

        const blob = pdf.output('blob')
        const newBlob = new Blob([blob], { type: 'application/octet-stream' })
        const name = `請求書_${invoice?.invoiceNumber}_${invoice?.company}_${invoice?.customerName}.pdf`
        const a = document.createElement('a')
        a.href = URL.createObjectURL(newBlob)
        a.download = name
        a.click()
        URL.revokeObjectURL(a.href)
        a.remove()
    }

    const handleConfirmDelete = () => {
        dispatch(trashInvoice(invoice!.id))
        dispatch(setCurrentPage(Page.invoiceList))
        setShowDeleteModal(false)
    }

    const handleCancelDelete = () => {
        setShowDeleteModal(false)
    }

    if (!invoice) {
        return (
            <Container className="mt-4">
                <div>請求書が見つかりませんでした。</div>
            </Container>
        )
    }
    return (
        <div>
            <style>
                {`
        .main-content {
            padding-top: 80px; /* ヘッダーの高さ分 */
            padding-bottom: 80px; /* フッターの高さ分 */
        }
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
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 1rem;
        }
        .action-button {
          width: 100%;
          padding: 0.8rem;
        }
        .delete-button {
          background-color: #dc3545;
          border-color: #dc3545;
        }
        .delete-button:hover {
          background-color: #c82333;
          border-color: #bd2130;
        }
        .word-template-button {
          grid-column: 1 / -1;
          background-color: #28a745;
          border-color: #28a745;
        }
        .word-template-button:hover {
          background-color: #218838;
          border-color: #1e7e34;
        }
        `}
            </style>
            <InvoiceDownloader ref={invoiceRef} invoice={invoice} />
            <div className="fixed-header-container">
                <nav className="navbar">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                            dispatch(setCurrentPage(Page.invoiceList))
                        }
                    >
                        ← 一覧へ
                    </Button>
                    <span className="navbar-brand mb-0 h5">請求書詳細</span>
                    <span></span>
                </nav>
            </div>
            <Container className="main-content">
                <InvoiceDetailCard invoice={invoice} />
            </Container>
            <div className="action-bar">
                <Container>
                    <div className="action-buttons">
                        <Button
                            variant="primary"
                            className="action-button"
                            onClick={handleEdit}
                        >
                            編集
                        </Button>
                        <Button
                            variant="danger"
                            className="action-button delete-button"
                            onClick={handleDelete}
                        >
                            削除
                        </Button>
                        <Button
                            variant="success"
                            className="action-button word-template-button"
                            onClick={handleDownloadPDF}
                        >
                            請求書テンプレートをダウンロード
                        </Button>
                    </div>
                </Container>
            </div>

            {/* 削除確認モーダル */}
            <Modal show={showDeleteModal} onHide={handleCancelDelete} centered>
                <Modal.Header closeButton>
                    <Modal.Title>削除確認</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>この請求書を削除してもよろしいですか？</p>
                    <p className="text-muted">
                        請求書番号: {invoice?.invoiceNumber}
                        <br />
                        顧客名: {invoice?.customerName}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancelDelete}>
                        キャンセル
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        削除する
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
