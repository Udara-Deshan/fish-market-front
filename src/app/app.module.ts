import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {LoginComponent} from './core/login/login.component';
import {PageNotFoundComponent} from './core/page-not-found/page-not-found.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./core/auth/jwt.interceptor";
import {ApprovalDialogComponent} from './core/dialogs/approval-dialog/approval-dialog.component';
import {AlertAndErrorInterceptor} from "./core/alert-and-error/alert-and-error.interceptor";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ProgressSpinnerInterceptor} from "./components/shared/progress-spinner/progress-spinner.interceptor";
import {SharedModule} from "./components/shared/shared.module";


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        PageNotFoundComponent,
        ApprovalDialogComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    SharedModule,

  ],
    providers: [{provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: AlertAndErrorInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: ProgressSpinnerInterceptor, multi: true}],


  exports: [

  ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
