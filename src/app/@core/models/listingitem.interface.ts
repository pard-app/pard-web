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
    _geoloc?: { lat: 54.69235029999999; lng: 25.281753 };
    _highlightResult?: any;
}

interface AdditionalCartViewLogic {}

export class CartItem {
    item: ListingItem;
    quantity: number;
}

export interface CartItemObject {
    [id: string]: CartItem;
}
