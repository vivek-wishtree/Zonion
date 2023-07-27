import { DatePipe } from '@angular/common';
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
      restaurantId: 0,
      isActive: false,
      menuImageUrl: '',
      createdById: 0,
      openTime: new Date(),
      closingTime: new Date()
    };

  constructor( private toastr: ToastrService ,private route: ActivatedRoute, private restaurantService: RestaurantsService, private router: Router, private datePipe : DatePipe) {
    
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
              // console.log(response);
              this.restaurantDetails = response;
            }
          });
        }
      }
    })
  }

  Space(event : any){
    if(event.target.selectionStart === 0 && event.code === "Space"){
      event.preventDefault();
    }
  }

  removeTrailingSpaces(): void {
    if (this.restaurantDetails.name) {
      this.restaurantDetails.name = this.restaurantDetails.name.trim();
    }
  }


  update(){
    console.log(this.restaurantDetails);
    this.restaurantDetails.openTime = (new Date(`01/01/2000 ${this.restaurantDetails.openTime}`));
    this.restaurantDetails.closingTime = (new Date(`01/01/2000 ${this.restaurantDetails.closingTime}`));
    
    this.restaurantService.updateRestaurant(this.restaurantDetails.restaurantId, this.restaurantDetails).subscribe({
      next: (restaurant) => {
        console.log(restaurant);
        this.toastr.success('Restaurant Edited Successfully!', 'Success');
        this.router.navigate(['restaurants']);
      },
      error: (error) => {
        this.toastr.error('Failed to update restaurant. Please try again.', 'Error');
        this.router.navigate(['restaurants']);
        console.log('Error updating restaurant:', error);
      }
    });
  }
  formatTime(time: Date): string {
    console.log("Called " + time);
    var temp =  this.datePipe.transform(time, 'HH:mm');
    console.log(temp);
    
    console.log(typeof(temp));
    
    return temp ? temp : '';
  }
  
  public createImgPath = (serverPath: string) => { 
    // console.log(environment.baseApiUrl + serverPath);
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
