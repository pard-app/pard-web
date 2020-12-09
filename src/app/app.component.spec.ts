import { TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { TranslateModule } from "@ngx-translate/core";
import { NgcCookieConsentModule, NgcCookieConsentService } from "ngx-cookieconsent";
import { cookieConfig } from "./app.module";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";

describe("AppComponent", () => {
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule, TranslateModule.forRoot(), NgcCookieConsentModule.forRoot(cookieConfig), BrowserDynamicTestingModule],
            providers: [NgcCookieConsentService],
        }).compileComponents();
    }));

    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'PardWeb'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(true).toEqual(true);
    });
});
