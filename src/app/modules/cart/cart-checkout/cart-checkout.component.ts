import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartStoreService } from "../../../@features/stores/cart/cart.store.service";
import { CartItem } from "@models/listingitem.interface";
import { VendorService } from "@services/vendor/vendor.service";
import { IVendor } from "@models/vendor.interface";

@Component({
    selector: "app-cart-checkout",
    templateUrl: "./cart-checkout.component.html",
    styleUrls: ["./cart-checkout.component.scss"]
})
export class CartCheckoutComponent implements OnInit {
    public formBasic: FormGroup;
    public formDelivery: FormGroup;
    public formProgress: number = 0;
    public order: any;
    @Output() deliveryChanged: EventEmitter<any> = new EventEmitter();
    @Input() vendors: any;

    constructor(private fb: FormBuilder, private cartStoreService: CartStoreService, private vendorService: VendorService) {}

    ngOnInit(): void {
        this.formBasic = this.fb.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            mobile: ["", [Validators.required]]
        });

        this.formDelivery = this.fb.group({
            delivery: false,
            address: ["", [Validators.required]],
            country: ["", [Validators.required]],
            city: ["", [Validators.required]],
            county: "",
            postCode: ["", [Validators.required]],
            comments: ""
        });
    }

    get formBasicField() {
        return fieldName => this.formBasic.get(fieldName);
    }

    get formDeliveryField() {
        return fieldName => this.formDelivery.get(fieldName);
    }

    public async generateOrder() {
        const buyer = {
            firstName: this.formBasic.value.firstName,
            lastName: this.formBasic.value.lastName,
            email: this.formBasic.value.email,
            mobile: this.formBasic.value.mobile,
            delivery: this.formDelivery.value.delivery
        };

        let delivery;

        if (this.formDelivery.value.delivery) {
            delivery = {
                address: this.formDelivery.value.address,
                country: this.formDelivery.value.country,
                city: this.formDelivery.value.city,
                county: this.formDelivery.value.country,
                postCode: this.formDelivery.value.postCode,
                comments: this.formDelivery.value.comments
            };
        }

        const cartItemsArray: Array<CartItem> = Object.values(this.cartStoreService.get("cartItems"));

        const ordersGroupedByVendor = cartItemsArray.reduce((accumulator, currentValue) => {
            const parent = accumulator.find(e => e.vendor === currentValue.item.vendor);
            if (parent) {
                parent.sum += currentValue.item.price * currentValue.quantity;
                parent.orders.push({ ...currentValue.item, quantity: currentValue.quantity });
            } else {
                accumulator.push({
                    vendor: currentValue.item.vendor,
                    ...buyer,
                    ...delivery,
                    sum: currentValue.item.price * currentValue.quantity,
                    orders: [{ ...currentValue.item, quantity: currentValue.quantity }]
                });
            }
            return accumulator;
        }, []);

        console.log(ordersGroupedByVendor);
    }

    public toggleDelivery() {
        this.formDelivery.value.delivery ? this.deliveryChanged.emit(false) : this.deliveryChanged.emit(true);
    }

    public async submitOrder() {}

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
}
