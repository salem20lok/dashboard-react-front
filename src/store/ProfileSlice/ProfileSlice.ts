import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addProfileAction, ProfileState} from "./type";


export const initialState: ProfileState = {
    profile: {
        firstName: "",
        lastName: "",
        role: [],
        password: "",
        email: "",
        avatar: "",
        _id: ""
    },
    loading: true,
    error: false,
}


export const ProfileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        addProfile: (state, action: PayloadAction<addProfileAction>) => {
            state.profile = action.payload.profile
            state.loading = false
        }
    }
})


export const {addProfile} = ProfileSlice.actions

export default ProfileSlice.reducer