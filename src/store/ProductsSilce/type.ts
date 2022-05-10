import ProductsType from "../../@types/ProductsType";

export interface ProductsState {
    loading: boolean,
    error: boolean,
    count: number,
    products: ProductsType[]
}

export interface statePayloadFetch {
    skip: number
}