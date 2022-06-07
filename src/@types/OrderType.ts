import User from "./user";

export default interface OrderType {
    _id: string;
    user: User;
    orderItems: OrderItemsType[];
    orderStatus: string;
    total: number;
    createdAt: Date;
    updatedAt: Date
}


export interface OrderItemsType {
    _id: string;
    title: string;
    images: string;
    price: number;
    product: string;
    qte: number;
    createdAt: Date;
    updatedAt: Date
}