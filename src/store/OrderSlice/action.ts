import {createAsyncThunk} from "@reduxjs/toolkit";
import {statePayload} from "./type";
import axios from "axios";


export const fetchesOrder = createAsyncThunk(
    "orders/fetchesOrder",
    async (state: statePayload, thunkApi) => {

        const {skip, limit} = state

        try {
            const res = await axios.get("http://localhost:3000/order/admin", {
                params: {
                    skip: skip,
                    limit: limit
                },
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            return res.data
        } catch (e) {
            return []
        }
    }
)

