import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "app-cart-checkout",
    templateUrl: "./cart-checkout.component.html",
    styleUrls: ["./cart-checkout.component.scss"]
})
export class CartCheckoutComponent implements OnInit {
    public formBasic: FormGroup;
    public formDelivery: FormGroup;
    public formProgress: number = 0;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.formBasic = this.fb.group({
            firstName: ["", [Validators.required]],
            lastName: ["", [Validators.required]],
            email: ["", [Validators.required, Validators.email]],
            dateOfBirth: ""
        });

        this.formDelivery = this.fb.group({
            delivery: false,
            mobile: ["", [Validators.required]],
            address: ["", [Validators.required]],
            country: ["", [Validators.required]],
            city: ["", [Validators.required]],
            county: "",
            postCode: ["", [Validators.required]],
            comments: ""
        });

        console.log(this.formBasic);
    }

    get formBasicField() {
        return fieldName => this.formBasic.get(fieldName);
    }

    get formDeliveryField() {
        return fieldName => this.formDelivery.get(fieldName);
    }

    public submitCheckout() {}

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
