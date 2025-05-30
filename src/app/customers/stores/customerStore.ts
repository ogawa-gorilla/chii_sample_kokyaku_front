import { create } from 'zustand'

interface Customer {
  id: string
  name: string
  phoneNumber: string
  company: string
}

interface CustomerStore {
  customers: Customer[]
  addCustomer: (customer: Customer) => void
  removeCustomer: (id: string) => void
  updateCustomer: (id: string, customer: Partial<Customer>) => void
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [
    {
      id: '1',
      name: '田中 太郎',
      phoneNumber: '090-1234-5678',
      company: '鈴木商事'
    }
  ],
  addCustomer: (customer) =>
    set((state) => ({ customers: [...state.customers, customer] })),
  removeCustomer: (id) =>
    set((state) => ({
      customers: state.customers.filter((c) => c.id !== id)
    })),
  updateCustomer: (id, customer) =>
    set((state) => ({
      customers: state.customers.map((c) =>
        c.id === id ? { ...c, ...customer } : c
      )
    }))
})) 