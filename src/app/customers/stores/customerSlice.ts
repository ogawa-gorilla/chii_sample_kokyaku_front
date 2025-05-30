import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Customer } from '../types/customer'

interface CustomerState {
  customers: Customer[]
}

const initialState: CustomerState = {
  customers: [
    {
      id: '1',
      name: '田中 太郎',
      phoneNumber: '090-1234-5678',
      company: '鈴木商事'
    }
  ]
}

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    addCustomer: (state, action: PayloadAction<Customer>) => {
      state.customers.push(action.payload)
    },
    removeCustomer: (state, action: PayloadAction<string>) => {
      state.customers = state.customers.filter(
        customer => customer.id !== action.payload
      )
    },
    updateCustomer: (
      state,
      action: PayloadAction<{ id: string; customer: Partial<Customer> }>
    ) => {
      const index = state.customers.findIndex(c => c.id === action.payload.id)
      if (index !== -1) {
        state.customers[index] = {
          ...state.customers[index],
          ...action.payload.customer
        }
      }
    }
  }
})

export const { addCustomer, removeCustomer, updateCustomer } = customerSlice.actions
export default customerSlice.reducer 