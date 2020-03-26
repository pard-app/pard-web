import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  title = "pard-web";
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang("en");
    this.translate.use(this.translate.getBrowserLang());
  }
}
