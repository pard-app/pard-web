import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartStoreService } from "../../../@features/stores/cart/cart.store.service";
import { CartItem } from "@models/listingitem.interface";

@Component({
    selector: "app-cart-checkout",
    templateUrl: "./cart-checkout.component.html",
    styleUrls: ["./cart-checkout.component.scss"]
})
export class CartCheckoutComponent implements OnInit {
    public formBasic: FormGroup;
    public formDelivery: FormGroup;
    public formProgress: number = 0;

    constructor(private fb: FormBuilder, private cartStoreService: CartStoreService) {}

    ngOnInit(): void {
        this.formBasic = this.fb.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            mobile: ["", [Validators.required]],
            dateOfBirth: ""
        });

        this.formDelivery = this.fb.group({
            delivery: true,
            address: ["", [Validators.required]],
            country: ["", [Validators.required]],
            city: ["", [Validators.required]],
            county: "",
            postCode: ["", [Validators.required]],
            comments: ""
        });

        console.log(this.formBasic.value);
    }

    get formBasicField() {
        return fieldName => this.formBasic.get(fieldName);
    }

    get formDeliveryField() {
        return fieldName => this.formDelivery.get(fieldName);
    }
    public async submitOrder() {
        console.log(this.formBasic.value);
        console.log(this.formDelivery.value);
        console.log(this.cartStoreService.get("cartItems"));

        const buyer = {
            firstName: this.formBasic.value.firstName,
            lastName: this.formBasic.value.lastName,
            email: this.formBasic.value.email,
            mobile: this.formBasic.value.mobile,
            delivery: this.formDelivery.value.delivery
        };

        let delivery;

        if (this.formBasic.value.delivery) {
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
                parent.orders.push({ ...currentValue.item });
            } else {
                accumulator.push({ vendor: currentValue.item.vendor, orders: [{ ...currentValue.item }] });
            }
            return accumulator;
        }, []);
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
}
