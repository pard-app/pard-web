export interface ListingItem extends AdditionalCartViewLogic {
    categories: [];
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
}

interface AdditionalCartViewLogic {}

export interface CartItem {
    item: ListingItem;
    quantity: number;
}
