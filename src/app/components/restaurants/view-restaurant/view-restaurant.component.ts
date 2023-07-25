import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environment';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-view-restaurant',
  templateUrl: './view-restaurant.component.html',
  styleUrls: ['./view-restaurant.component.css']
})
export class ViewRestaurantComponent {


  restaurantDetails:Restaurant = {
    name: '',
    phone: '',
    address: '',
    openTime: '',
    closingTime: '',
    restaurantId: 0,
    isActive: false,
    lastUpdatedTime: '',
    menuImageUrl: '',


  };
  


  constructor( private toastr: ToastrService ,private route: ActivatedRoute, private restaurantService: RestaurantsService, private router: Router) {
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next:(params) => {
        const id = params.get('id');

        if(id){
          //Api call..!
          this.restaurantService.getRestaurant(id)
          .subscribe({
            next:(response) =>{
              this.restaurantDetails = response;

            }
          });
        }
      }
    })
  }
  public createImgPath = (serverPath: string) => { 
    console.log(environment.baseApiUrl + serverPath);
    return environment.baseApiUrl + serverPath; 
  }



  GoBack(){
    this.router.navigate(['restaurants']);
  }

}
