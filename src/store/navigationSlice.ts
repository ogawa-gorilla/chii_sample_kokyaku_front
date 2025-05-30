import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page } from "../types/page";

type Page = typeof Page[keyof typeof Page];

interface NavigationState {
  currentPage: Page
}

const initialState: NavigationState = {
  currentPage: Page.customerList
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload
    }
  },
})

export const { setCurrentPage } = navigationSlice.actions
export default navigationSlice.reducer
