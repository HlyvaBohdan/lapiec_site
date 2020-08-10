import { ICategory } from './category.interface';

export interface IProduct{
    id: number;
    category: ICategory;
    nameEN: string;
    nameUA: string;
    description: string;
    weight: string;
    price: number;
    image: string;
    count: number;
}