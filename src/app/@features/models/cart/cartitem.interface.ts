export interface CartItem extends AdditionalCartViewLogic {
    categories: [];
    description: string;
    image: string;
    price: number;
    sold: boolean;
    stock: number;
    title: string;
    id: string;
    vendor: string;
    published: boolean;
    date: number;
}

interface AdditionalCartViewLogic {}
