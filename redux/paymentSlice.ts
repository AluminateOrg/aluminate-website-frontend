import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  plan: string | null;
  price: number | null;
  purpose: 'registration' | 'renewal' | 'upgrade' | null;
}

const initialState: PaymentState = {
  plan: null,
  price: null,
  purpose: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentData(state, action: PayloadAction<PaymentState>) {
      state.plan = action.payload.plan;
      state.price = action.payload.price;
      state.purpose = action.payload.purpose;
    },
    clearPaymentData(state) {
      state.plan = null;
      state.price = null;
      state.purpose = null;
    },
  },
});

export const { setPaymentData, clearPaymentData } = paymentSlice.actions;
export default paymentSlice.reducer;
