import { configureStore } from '@reduxjs/toolkit';
import customerReducer from './features/customerSlice';
import navigationReducer from './navigationSlice';

export const store = configureStore({
    reducer: {
        customer: customerReducer,
        navigation: navigationReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;