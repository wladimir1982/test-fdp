import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { AcquaintanceComponent } from './main/acquaintance/acquaintance.component';
import { AboutComponent } from './main/about/about.component';
import { GeneralComponent } from './main/general/general.component';
import { RegistrationComponent } from './main/registration/registration.component';
import { UsersComponent } from './main/users/users.component';
import { LoaderComponent } from './shared/loader/loader.component';
import {FileValidator} from './main/registration/file-input.validator';
import {FileValueAccessor} from './main/registration/file-value-accessor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AcquaintanceComponent,
    AboutComponent,
    GeneralComponent,
    RegistrationComponent,
    UsersComponent,
    LoaderComponent,
    FileValueAccessor,
    FileValidator
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
