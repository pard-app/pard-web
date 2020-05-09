import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartStoreService } from "src/app/@core/stores/cart/cart.store.service";
import { CartItem, CartItemObject } from "src/app/@core/models/listingitem.interface";
import { VendorService } from "src/app/@core/services/vendor/vendor.service";
import { DbService } from "src/app/@core/services/db-service/db-service.service";
import { TranslateService } from "@ngx-translate/core";
import { ROUTING_CONSTANTS } from "src/app/@core/constants/routing.constants";
import { NbDialogService } from "@nebular/theme";
import { TermsAndConditionsModalComponent } from "src/app/@modules/terms-and-conditions/terms-and-conditions-page/terms-and-conditions-modal.component";

@Component({
    selector: "app-cart-checkout",
    templateUrl: "./cart-checkout.component.html",
    styleUrls: ["./cart-checkout.component.scss"],
})
export class CartCheckoutComponent implements OnInit {
    public formBasic: FormGroup;
    public formDelivery: FormGroup;
    public formProgress: number = 0;
    public orders: any;
    public review: any;
    public buyer: any;
    public delivery: any;
    public loading: boolean = true;
    public confirmedOrder: any;
    public ROUTES: { [name: string]: string };
    public captcha: string;
    public globalRoutes = ROUTING_CONSTANTS;

    @Output() deliveryChanged: EventEmitter<any> = new EventEmitter();
    @Input() vendors: any;
    @Input() cartItems: CartItemObject;

    constructor(
        private fb: FormBuilder,
        private cartStoreService: CartStoreService,
        private vendorService: VendorService,
        private dbService: DbService,
        private translate: TranslateService,
        private dialogService: NbDialogService
    ) {}

    ngOnInit(): void {
        this.formBasic = this.fb.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            phone: [""],
            terms: false,
        });

        this.formDelivery = this.fb.group({
            delivery: false,
            address: ["", [Validators.required]],
            country: ["", [Validators.required]],
            city: ["", [Validators.required]],
            county: "",
            postCode: ["", [Validators.required]],
            comments: "",
        });

        this.ROUTES = ROUTING_CONSTANTS;
    }

    get formBasicField() {
        return (fieldName) => this.formBasic.get(fieldName);
    }

    get formDeliveryField() {
        return (fieldName) => this.formDelivery.get(fieldName);
    }

    public async generateOrder() {
        this.buyer = {
            firstName: this.formBasic.value.firstName,
            lastName: this.formBasic.value.lastName,
            email: this.formBasic.value.email,
            phone: this.formBasic.value.phone,
        };

        if (this.formDelivery.value.delivery) {
            this.buyer = {
                ...this.buyer,
                address: this.formDelivery.value.address,
                country: this.formDelivery.value.country,
                city: this.formDelivery.value.city,
                county: this.formDelivery.value.county,
                postCode: this.formDelivery.value.postCode,
                comments: this.formDelivery.value.comments,
            };
        }

        const cartItemsArray: Array<CartItem> = Object.values(this.cartStoreService.get("cartItems"));

        const ordersGroupedByVendor = cartItemsArray.reduce((accumulator, currentValue) => {
            const parent = accumulator.find((e) => e.vendor === currentValue.item.vendor);
            if (parent) {
                parent.listings.push({ id: currentValue.item.objectID, quantity: currentValue.quantity });
            } else {
                accumulator.push({
                    vendor: currentValue.item.vendor,
                    listings: [{ id: currentValue.item.objectID, quantity: currentValue.quantity }],
                });
            }
            return accumulator;
        }, []);

        const ordersGroupedByVendorWithData = cartItemsArray.reduce((accumulator, currentValue) => {
            const parent = accumulator.find((e) => e.vendor === currentValue.item.vendor);
            if (parent) {
                parent.listings.push({ id: currentValue.item.objectID, quantity: currentValue.quantity, ...currentValue.item });
            } else {
                accumulator.push({
                    vendor: currentValue.item.vendor,
                    listings: [{ id: currentValue.item.objectID, quantity: currentValue.quantity, ...currentValue.item }],
                });
            }
            return accumulator;
        }, []);

        ordersGroupedByVendorWithData.map((order) => {
            order.vendor = this.vendors.find((vendor) => vendor.objectID === order.vendor);
        });

        this.review = ordersGroupedByVendorWithData;
        this.orders = ordersGroupedByVendor;
        this.delivery = this.formDelivery.value.delivery;
    }

    public toggleDelivery() {
        this.formDelivery.value.delivery ? this.deliveryChanged.emit(false) : this.deliveryChanged.emit(true);
    }

    public async submitOrder() {
        const response = await this.dbService.placeOrder(this.orders, this.buyer, this.delivery, false, this.captcha);
        this.loading = false;
        this.confirmedOrder = response ? response : this.translate.instant("ERROR_WHILE_PLACING_ORDER");
        this.cartStoreService.resetCart();
    }

    openTerms() {
        this.dialogService.open(TermsAndConditionsModalComponent);
    }

    get status() {
        if (this.formProgress <= 25) {
            return "danger";
        } else if (this.formProgress <= 50) {
            return "warning";
        } else if (this.formProgress <= 75) {
            return "info";
        } else {
            return "success";
        }
    }

    resolved(captchaResponse: string) {
        this.captcha = captchaResponse;
    }
}
