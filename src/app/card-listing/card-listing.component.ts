import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-card-listing",
  templateUrl: "./card-listing.component.html",
  styleUrls: ["./card-listing.component.scss"]
})
export class CardListingComponent implements OnInit {
  @Input() item: any;

  constructor() {}

  ngOnInit(): void {}
}
