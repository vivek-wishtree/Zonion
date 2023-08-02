import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environment';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent {


  restaurantDetails: Restaurant = {
    name: '',
    phone: '',
    address: '',
    restaurantId: 0,
    isActive: false,
    menuImageUrl: '',
    openTime: new Date(),
    closingTime: new Date()
  };






  constructor(private toastr: ToastrService, private route: ActivatedRoute, private restaurantService: RestaurantsService, private router: Router, private datePipe: DatePipe) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {

          // Format openTime and closingTime

          //Api call..!
          this.restaurantService.getRestaurant(id)
            .subscribe({
              next: (response) => {
                this.restaurantDetails = response;
              }
            });
        }
      }
    })
  }

  formatTime(time: Date): string {
    return this.datePipe.transform(time, 'HH:mm') || ''; // Return formatted time or an empty string if time is not defined
  }
  public createImgPath = (serverPath: string) => {
    return environment.baseApiUrl + serverPath;
  }

  GoBack() {
    this.router.navigate(['restaurants']);
  }

}
