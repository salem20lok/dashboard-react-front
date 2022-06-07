import OrderType from "../../@types/OrderType";

export interface orderState {
    count: number
    orders: OrderType[]
    loading: boolean
    error: boolean
}

export interface statePayload {
    skip: number,
    limit: number
}