import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry, map, finalize } from "rxjs/operators";
import { NbToastrService } from "@nebular/theme";
import { Injectable } from "@angular/core";

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
    constructor(private toastrService: NbToastrService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = "";
                if (error.error instanceof ErrorEvent) {
                    // client-side error
                    errorMessage = `Error: ${error.error.message}`;
                } else {
                    // server-side error
                    errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                }
                this.toastrService.show(errorMessage, `An error`, { status: "danger" });
                return throwError(errorMessage);
            })
        );
    }
}
