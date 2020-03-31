import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CartStoreService } from "../../../@features/stores/cart/cart.store.service";

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

        let orders = [];
        const cart = Object.entries(this.cartStoreService.get("cartItems"));

        // Very dirty way of mapping cart items by vendors
        for (let entry of cart) {
            if (!orders[entry[1]["item"].vendor]) {
                orders[entry[1]["item"].vendor] = {
                    ...buyer,
                    ...delivery,
                    vendor: entry[1]["item"].vendor,
                    listings: [(entry[0] = { ...entry[1]["item"], quantity: entry[1]["quantity"] })]
                };
            } else {
                orders[entry[1]["item"].vendor].listings.push((entry[0] = { ...entry[1]["item"], quantity: entry[1]["quantity"] }));
            }
        }

        console.log(orders);
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
