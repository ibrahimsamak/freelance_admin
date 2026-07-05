import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./auth/login/login.component";
import { ToastrModule } from "ngx-toastr";

import { AuthService } from "./shared/services/firebase/auth.service";
import { AdminGuard } from "./shared/guard/admin.guard";
import { SecureInnerPagesGuard } from "./shared/guard/SecureInnerPagesGuard.guard";
import { CookieService } from "ngx-cookie-service";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { NgSelectModule } from "@ng-select/ng-select";
import { ResetpasswordComponent } from "./auth/resetpassword/resetpassword.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent, LoginComponent, ResetpasswordComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    NgSelectModule,
  ],
  providers: [AuthService, AdminGuard, SecureInnerPagesGuard, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
