import User from "../../@types/user";


export interface ProfileState {
    profile: User,
    loading: boolean,
    error: boolean,
}


export interface addProfileAction {
    profile: User
}