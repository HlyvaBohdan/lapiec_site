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
    dateOrder: Date;
    userComment: string;
    status: string;
}