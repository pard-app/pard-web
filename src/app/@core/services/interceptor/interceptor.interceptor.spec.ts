import { TestBed } from "@angular/core/testing";

import { GlobalInterceptor } from "./interceptor.interceptor";
import { NbToastrModule, NbThemeModule } from "@nebular/theme";
import { RouterTestingModule } from "@angular/router/testing";

describe("GlobalInterceptor", () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, NbToastrModule.forRoot(), NbThemeModule.forRoot()],
            providers: [GlobalInterceptor],
        })
    );

    it("should be created", () => {
        const interceptor: GlobalInterceptor = TestBed.inject(GlobalInterceptor);
        expect(interceptor).toBeTruthy();
    });
});
