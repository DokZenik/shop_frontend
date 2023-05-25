import { configureStore } from '@reduxjs/toolkit';

import cart from '../Redux/Slices/cartSlice.js';

export const store = configureStore({
  reducer: {
    cart,
  },
});
