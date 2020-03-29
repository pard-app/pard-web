import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
    selector: "app-cart-checkout",
    templateUrl: "./cart-checkout.component.html",
    styleUrls: ["./cart-checkout.component.scss"]
})
export class CartCheckoutComponent implements OnInit {
    inputItemNgModel: string;
    myForm: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.myForm = this.fb.group({
            name: "",
            email: "",
            phone: ""
        });
    }
}
