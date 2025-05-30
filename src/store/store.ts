import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/customerSlice';
import navigationReducer from './navigationSlice';
import invoiceReducer from './features/invoiceSlice';

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        invoice: invoiceReducer,
        navigation: navigationReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;