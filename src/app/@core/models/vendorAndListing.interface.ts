interface Child {
    id: string;
    image: string;
    title: string;
    description: string;
    type: string;
    price: number;
}
export interface SearchVendorOrListingGroup {
    name: string;
    children: Child[];
}
