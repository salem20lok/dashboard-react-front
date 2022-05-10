import User from "./user";

export default interface ProductsType {
    _id: string;
    title: string;
    description: string;
    category: string;
    images: string;
    user: User;
    stock: number;
    price: number
}