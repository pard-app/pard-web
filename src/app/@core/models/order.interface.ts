export class OrderModel {
    // Basic form info
    name: string;
    email: string;
    phone: string;
    delivery: boolean;
    address: string;
    comments: string;
    // Not UI visible data:
    date: string;
    orderNumber: string;
    listings: [];
    vendor: string;
    sum: number;
    status: string;
    completed: boolean;
    id: string;
}
