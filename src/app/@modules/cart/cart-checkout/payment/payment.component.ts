import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from "@angular/core";
import { loadStripe, Stripe, StripeCardElement } from "@stripe/stripe-js";
import { environment } from "src/environments/environment";

@Component({
    selector: "checkout-payment",
    templateUrl: "./payment.component.html",
    styleUrls: ["./payment.component.scss"],
})
export class PaymentComponent implements AfterViewInit {
    @Input() stepper;
    @ViewChild("paymentForm") paymentForm: ElementRef<HTMLFormElement>;
    public stripe: Stripe;
    public cardError: string;
    public card: StripeCardElement;

    constructor() {}

    async ngAfterViewInit() {
        this.stripe = await loadStripe(environment.stripeConfig.publishableKey);
        const elements = this.stripe.elements();
        this.card = elements.create("card", {
            style: {
                base: {
                    color: "#32325d",
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {
                        color: "#768fa7",
                    },
                },
                invalid: {
                    color: "#fa755a",
                    iconColor: "#fa755a",
                },
            },
        });

        this.card.mount("#card-element");

        this.card.on("change", (event) => {
            if (event.error) {
                this.cardError = event.error.message;
            } else {
                this.cardError = "";
            }
        });
    }

    async submitPayment() {
        const { token, error } = await this.stripe.createToken(this.card);
        if (error) {
            // Inform the user if there was an error.
            this.cardError = error.message;
        } else {
            console.log(token);

            // Send the token to your server.
            // this.stripeTokenHandler(result.token);
        }
    }
}
