import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './components/restaurants/restaurant-list/restaurant-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AddRestaurantComponent } from './components/restaurants/add-restaurant/add-restaurant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRestaurantComponent } from './components/restaurants/edit-restaurant/edit-restaurant.component';

import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ViewRestaurantComponent } from './components/restaurants/view-restaurant/view-restaurant.component';

import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    ViewRestaurantComponent,
    LoginComponent,
    SignupComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
   

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
