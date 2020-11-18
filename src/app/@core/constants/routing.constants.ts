import { NavigationExtras } from "@angular/router";
import { removeUndefinedObjectValues } from "@utils/index";

enum ROUTING_CONSTANTS {
    ROOT = "",
    MARKET_PAGE = "marketplace",
    VENDOR_PAGE_ROOT = "vendor",
    CART_PAGE_ROOT = "cart",
    ABOUT_PAGE_ROOT = "about",
    CART_CHECKOUT_PAGE_ROOT = "checkout",
    CART_LISTINGS_PAGE_ROOT = "listings",
    // TERMS_AND_CONDITIONS = "terms",
    // PRIVACY_POLICY = "privacy-policy",
}

enum QUERY_PARAMS {
    LOCATION = "location",
    SEARCH = "search",
}

const locationQueryParams = ({ location = undefined, search = undefined }): NavigationExtras => {
    const queryParams = removeUndefinedObjectValues({
        [QUERY_PARAMS.LOCATION]: location,
        [QUERY_PARAMS.SEARCH]: search,
    });
    return {
        queryParams,
        queryParamsHandling: "merge",
    };
};

export { ROUTING_CONSTANTS, QUERY_PARAMS, locationQueryParams };
