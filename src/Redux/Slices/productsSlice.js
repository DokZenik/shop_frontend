import { createSlice } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        },
    },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;