import Category from "../../@types/Category";

export interface CategoryState {
    count: number,
    category: Category[],
    error: boolean,
    loading: boolean
}

export interface stateFetchPayload {
    skip: number
}