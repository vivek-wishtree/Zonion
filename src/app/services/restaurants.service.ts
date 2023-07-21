import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from '../environments/environment';
import { Restaurant } from '../models/restaurant.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(this.baseApiUrl + 'api/Restaurants');
  }

  addRestaurant(addRestaurantRequest: Restaurant):Observable<Restaurant>{

    return this.http.post<Restaurant>(this.baseApiUrl + 'api/Restaurants',addRestaurantRequest);
  }

  getRestaurant(id : any): Observable<Restaurant>{
    return this.http.get<Restaurant>(this.baseApiUrl + 'api/Restaurants/' + id);
  }

  deleteRestaurant(id:any):Observable<Restaurant>{
    return this.http.delete<Restaurant>(this.baseApiUrl + 'api/Restaurants/' + id);
  }

  updateRestaurant(id: any, updateRestaurantRequest: Restaurant):Observable<Restaurant>
  {
    console.log(this.baseApiUrl + 'api/Restaurants/' + id);
    return this.http.put<Restaurant>(this.baseApiUrl + 'api/Restaurants/' + id , updateRestaurantRequest);
  }

  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile, imageFile.name);
    return this.http.post<any>(this.baseApiUrl + `api/Restaurants/UploadImage`, formData);
  }

  updateImage(id : any,imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile, imageFile.name);
    return this.http.post<any>(this.baseApiUrl + `api/Restaurants/UpdateImage` + id, formData);
  }
}
