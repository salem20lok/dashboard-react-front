import {CategoryState} from "./type";
import {createSlice} from "@reduxjs/toolkit";
import {fetchCategory} from "./action";

export const initialState: CategoryState = {
    error: false,
    loading: true,
    category: [],
    count: 0
}


export const CategorySlice = createSlice(
    {
        name: "category",
        initialState: initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(fetchCategory.pending, (state) => {
                state.loading = true
                state.error = false
                state.count = 0
                state.category = []
            })
            builder.addCase(fetchCategory.rejected, (state) => {
                state.loading = false
                state.error = true
                state.count = 0
                state.category = []
            })
            builder.addCase(fetchCategory.fulfilled, (state, {payload}) => {
                state.loading = false
                state.error = false
                state.count = payload.count
                state.category = payload.category
            })
        }
    }
)

export default CategorySlice.reducer