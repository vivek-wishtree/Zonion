import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantListComponent } from './components/restaurants/restaurant-list/restaurant-list.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddRestaurantComponent } from './components/restaurants/add-restaurant/add-restaurant.component';
import { FormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditRestaurantComponent } from './components/restaurants/edit-restaurant/edit-restaurant.component';

import { ToastrModule, ToastrService, ToastrConfig } from 'ngx-toastr';
import { ViewRestaurantComponent } from './components/restaurants/view-restaurant/view-restaurant.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
    ViewRestaurantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxMaterialTimepickerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
