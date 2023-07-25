import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../environments/environment';
import { Restaurant } from '../models/restaurant.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http: HttpClient) { }

  getAllRestaurants(): Observable<Restaurant[]> {
    const token = localStorage.getItem('token');
    // console.log('token'+token);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Restaurant[]>(this.baseApiUrl + 'api/Restaurants', { headers });
  }


  addRestaurant(addRestaurantRequest: Restaurant): Observable<Restaurant> {
    const token = localStorage.getItem('token');
    // console.log('token' + token);

    // Add the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Restaurant>(
      this.baseApiUrl + 'api/Restaurants',
      addRestaurantRequest,
      { headers }
    );
  }

  getRestaurant(id: any): Observable<Restaurant> {

    return this.http.get<Restaurant>(this.baseApiUrl + 'api/Restaurants/' + id);
  }

  // Function to delete a restaurant with authorization
  deleteRestaurant(id: any): Observable<Restaurant> {
    const token = localStorage.getItem('token');
    // console.log('token' + token);

    // Add the Authorization header with the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<Restaurant>(this.baseApiUrl + 'api/Restaurants/' + id, {
      headers,
    });
  }


// Function to update a restaurant with authorization
// PUT: Update an existing restaurant
updateRestaurant(id: any, restaurantDetails: Restaurant): Observable<any> {
  const token = localStorage.getItem('token');
  // console.log("Update method "+token);
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  // console.log("Update method "+this.baseApiUrl + 'api/Restaurants/' + id);

  return this.http.put<Restaurant>(this.baseApiUrl + 'api/Restaurants/' + id, restaurantDetails, {
    headers
  });
}


  uploadImage(imageFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('imageFile', imageFile, imageFile.name);
    return this.http.post<any>(this.baseApiUrl + `api/Restaurants/UploadImage`, formData);
  }

}
