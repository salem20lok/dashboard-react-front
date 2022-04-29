import User from "../../@types/user";

export interface UserState {
    error: boolean;
    loading: boolean;
    users: User[];
    count: number
}
