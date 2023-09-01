import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './commons/components/button/button.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {StoreModule} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {ROOT_REDUCERS} from "./store/root-reduces";
import {EffectsModule} from "@ngrx/effects";
import {AuthUserEffects} from "./store/user/effects/auth-user.effects";
import {AccessTokenEffects} from "./store/access-token/effects/access-token.effects";
import { AuthTokenInterceptor } from './commons/interceptor/auth-token.interceptor';
import { LoaderInterceptor } from './commons/interceptor/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    EffectsModule.forRoot([
      AuthUserEffects,
      AccessTokenEffects
    ]),
    BrowserAnimationsModule
  ],
  providers: [
    provideStoreDevtools({
      maxAge: 25
    }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
