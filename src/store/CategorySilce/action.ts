import {createAsyncThunk} from "@reduxjs/toolkit";
import {stateFetchPayload} from "./type";
import axios from "axios";


export const fetchCategory = createAsyncThunk(
    "category/fetcheCategory",
    async (state: stateFetchPayload, thunkApi) => {
        const {skip} = state
        try {

            const res = await axios.get("http://localhost:3000/category", {
                params: {
                    skip: skip
                }
            })

            return res.data

        } catch (e) {

            return []

        }
    }
)


