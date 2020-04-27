import { NavigationExtras } from "@angular/router";
import { removeUndefinedObjectValues } from "@utils/index";

enum ROUTING_CONSTANTS {
    ROOT = "",
    MARKET_PAGE = "marketplace",
    VENDOR_PAGE_ROOT = "vendor",
    CART_PAGE_ROOT = "cart",
    CART_CHECKOUT_PAGE_ROOT = "checkout",
    CART_LISTINGS_PAGE_ROOT = "listings",
    TERMS_AND_CONDITIONS = "terms_and_conditions",
    PRIVACY_POLICY = "privacy_policy",
}

enum QUERY_PARAMS {
    LOCATION = "location",
    VENDORORLISTING = "vendorOrListing",
}

const locationQueryParams = ({ location = undefined, vendorOrListing = undefined }): NavigationExtras => {
    const queryParams = removeUndefinedObjectValues({
        [QUERY_PARAMS.LOCATION]: location,
        [QUERY_PARAMS.VENDORORLISTING]: vendorOrListing,
    });
    return {
        queryParams,
        queryParamsHandling: "merge",
    };
};

export { ROUTING_CONSTANTS, QUERY_PARAMS, locationQueryParams };
