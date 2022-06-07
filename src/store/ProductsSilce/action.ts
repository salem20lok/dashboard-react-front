import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {statePayloadFetch} from "./type";


export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (state: statePayloadFetch, thunkApi) => {
        const {skip, limit} = state
        try {
            const res = await axios.get("http://localhost:3000/product", {
                params: {
                    skip: skip,
                    limit: limit
                }
            })

            return res.data

        } catch (e) {
            return []
        }
    }
)