import {orderState} from "./type";
import {createSlice} from "@reduxjs/toolkit";
import {fetchesOrder} from "./action";

const installState: orderState = {
    loading: false,
    error: false,
    count: 0,
    orders: []
}


const OrdersSlice = createSlice({
    name: "order",
    initialState: installState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchesOrder.pending, (state) => {
            state.loading = true
            state.error = false
            state.count = 0
            state.orders = []
        })
        builder.addCase(fetchesOrder.rejected, (state) => {
            state.loading = false
            state.error = true
            state.count = 0
            state.orders = []
        })
        builder.addCase(fetchesOrder.fulfilled, (state, {payload}) => {
            state.loading = false
            state.error = false
            state.count = payload.count
            state.orders = payload.orders
        })
    }
})


export default OrdersSlice.reducer