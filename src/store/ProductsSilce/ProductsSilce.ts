import {ProductsState} from "./type";
import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "./action";

export const initialState: ProductsState = {
    error: false,
    loading: false,
    count: 0,
    products: []
}


export const ProductSlice = createSlice({
    name: "products",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.products = []
            state.error = false
            state.count = 0
        });
        builder.addCase(fetchProducts.rejected, (state) => {
            state.loading = false
            state.products = []
            state.error = true
            state.count = 0
        });
        builder.addCase(fetchProducts.fulfilled, (state, {payload}) => {
            state.loading = false
            state.products = payload.products
            state.error = false
            state.count = payload.count
        })
    }
})


export default ProductSlice.reducer