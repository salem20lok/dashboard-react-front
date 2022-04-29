import {UserState} from "./type";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchUsers} from "./action";

export const initialState: UserState = {
    error: false,
    loading: true,
    users: [],
    count: 0
};

export interface statePayload {
    skip?: number;
}


export const UsersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        getUsers: (state, action: PayloadAction<UserState>) => {
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.users = [];
            state.count = 0;
        });
        builder.addCase(fetchUsers.fulfilled, (state, {payload}) => {
            state.loading = false;
            state.error = false;
            state.users = payload.users;
            state.count = payload.count;

        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.users = [];
            state.count = 0;
        });
    },
});

export const {getUsers} = UsersSlice.actions;

export default UsersSlice.reducer;
