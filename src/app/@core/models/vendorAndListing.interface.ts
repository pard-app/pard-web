interface Child {
    id: string;
    image: string;
    title: string;
    description: string;
    type: string;
}
export interface SearchVendorOrListingGroup {
    name: string;
    children: Child[];
}
