import { IProduct } from '../interfaces/product.interface';
export interface IOrder{
    id: number;
    userName: string;
    userPhone: string;
    userCity: string;
    userStreet: string;
    userHouse: string;
    ordersDetails: Array<IProduct>;
    totalPayment: number;
    dateOrder: string;
    userComment: string;
    status: string;
}