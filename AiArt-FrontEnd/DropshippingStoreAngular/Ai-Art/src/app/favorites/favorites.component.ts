import { Component, effect, inject } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Image } from '../types/image.interface';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import { NotificationService } from '../services/notification.service';
import { AppStore } from '../store/app.store';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [MatDividerModule, MatButtonModule, FooterComponent,MatGridListModule,MatIconModule, RouterLink,MatTooltipModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent {
  appStore = inject(AppStore)

constructor(private readonly notificationService: NotificationService){
  effect(()=>{},{allowSignalWrites:true})
}


handleAddToCart(img: Image){
  if(!this.appStore.cart().find((i)=>i.id===img.id)){
    this.appStore.setCart(img)
    let filtered = this.appStore.favorites().filter(i=>i.id!==img.id)
    this.appStore.removeFromFavorites(filtered)
    this.notificationService.handleSnackBar('Item is added in cart!')
  }else{
    this.notificationService.handleSnackBar('Item is already in cart!')
  }

}

handleRemoveFromFavorites(img: Image){
  let filtered = this.appStore.favorites().filter(i=>i.id!==img.id)
  this.appStore.removeFromFavorites(filtered)
  this.notificationService.handleSnackBar('Item is removed from favorites!')
}
}
