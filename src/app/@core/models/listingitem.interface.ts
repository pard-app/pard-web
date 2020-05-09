export interface ListingItem extends AdditionalCartViewLogic {
    description: string;
    image: string;
    price: number;
    sold: boolean;
    stock: number;
    title: string;
    objectID: string;
    vendor: string;
    published: boolean;
    date: number;
    quantity?: number;
}

interface AdditionalCartViewLogic {}

export class CartItem {
    item: ListingItem;
    quantity: number;
}

export interface CartItemObject {
    [id: string]: CartItem;
}
