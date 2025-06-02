import { Page } from "@/types/page";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  currentPage: Page
}

const initialState: NavigationState = {
  currentPage: Page.home
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
