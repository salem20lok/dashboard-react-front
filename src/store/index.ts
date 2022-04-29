import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import usersReducer from "./UserSilce/UserSlice";
import profileReducer from "./ProfileSlice/ProfileSlice";
import {useDispatch} from "react-redux";

export const Store = configureStore({
    reducer: {
        users: usersReducer,
        profile: profileReducer
    },
    middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof Store.getState>;
export const useAppDispatch: any = () => useDispatch();
