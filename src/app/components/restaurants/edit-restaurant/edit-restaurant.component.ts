import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/app/environments/environment';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantsService } from 'src/app/services/restaurants.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit{

  restaurantDetails:Restaurant = {
    name: '',
    phone: '',
    address: '',
    openTime: '',
    closingTime: '',
    isActive: false,
    restaurantId: 0,
    menuImageUrl: ''
  }

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
              console.log(response);
              this.restaurantDetails = response;
            }
          });
        }
      }
    })
  }


  updateRestaurant(){
    this.restaurantService.updateRestaurant(this.restaurantDetails.restaurantId, this.restaurantDetails).subscribe({
      next: (restaurant) => {
        this.toastr.success('Restaurant Edited Successfully!', 'Success');
        this.router.navigate(['restaurants']);
        console.log(restaurant);
      },
      error: (error) => {
        this.toastr.error('Failed to update restaurant. Please try again.', 'Error');
        this.router.navigate(['restaurants']);
        console.error('Error updating restaurant:', error);
      }
    });
  }
  
  public createImgPath = (serverPath: string) => { 
    console.log(environment.baseApiUrl + serverPath);
    return environment.baseApiUrl + serverPath; 
  }

  onImageChange(event: Event) {
    const fileInput = event.target as HTMLInputElement;
  
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.restaurantService.uploadImage(file).subscribe(
        (response: any) => {
          this.toastr.success('Image uploaded successfully.', 'Success');
          this.restaurantDetails.menuImageUrl = response.menuImageUrl;
        },
        (error) => {
          this.toastr.error('Failed to upload image. Please try again.', 'Error');
          console.error('Error uploading image:', error);
        }
      );
    }
  }
  



}