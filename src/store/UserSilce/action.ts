import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {statePayload} from "./UserSlice";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async (state: statePayload, thunkApi) => {
        const {skip} = state;
        try {
            const res = await axios.get(
                "http://localhost:3000/user/users-pagination",
                {
                    params: {skip: skip},
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            );
            return res.data;
        } catch (e) {
            return [];
        }
    }
);