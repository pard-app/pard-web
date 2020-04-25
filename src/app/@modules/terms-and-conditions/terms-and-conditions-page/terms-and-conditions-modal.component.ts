import { Component, OnInit } from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
    selector: "app-terms-and-conditions",
    templateUrl: "./terms-and-conditions.component.html",
    styleUrls: ["./terms-and-conditions.component.scss"],
})
export class TermsAndConditionsModalComponent implements OnInit {
    public isModal: boolean = true;
    constructor(protected dialogRef: NbDialogRef<any>) {}

    ngOnInit(): void {}

    closeModal() {
        this.dialogRef.close();
    }
}
