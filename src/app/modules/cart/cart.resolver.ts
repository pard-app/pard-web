// @TODO - Need to fetch vendors from listings before route is activated

import { Injectable } from "@angular/core";

import { Resolve } from "@angular/router";
import { VendorService } from "@services/vendor/vendor.service";

@Injectable()
export class CartResolver implements Resolve<Array<any>> {
    constructor(private vendorService: VendorService) {}

    resolve() {
        return [];
    }
}
