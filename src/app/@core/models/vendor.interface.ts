export interface IVendor {
    address: string;
    bank: string;
    city: string;
    company: string;
    country: string;
    description: string;
    email: string;
    image: string;
    phone: string;
    registered: string;
    regno: string;
    delivery: boolean;
    delivery_costs: number;
    delivery_note: string;
    title: string;
    objectID: string;
    _geoloc: {
        lat: number;
        lng: number;
    };
    listings: Array<any>;
    config?: any;
}
