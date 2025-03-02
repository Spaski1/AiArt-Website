import { Component, effect, inject, input } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';
import { Image } from '../../../types/image.interface';
import { AppStore } from '../../../store/app.store';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-card2',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatIconModule,MatDividerModule, CurrencyPipe,RouterLink,MatChipsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  appStore= inject(AppStore)
 image=input.required<Image>()
 constructor(private notificationService:NotificationService){
  effect(()=>{},{allowSignalWrites:true})
 }
 handleAddToCart(item:Image){
  if(!this.appStore.cart().find((i)=>i.id===item.id)){
    this.appStore.setCart(item)
  this.notificationService.handleSnackBar('Item is successfully added in cart!')
  }
  
 }
 handleAddToFavorites(item:Image){
  if(!this.appStore.favorites().find((i)=>i.id===item.id)){
    this.appStore.setFavorites(item)
  this.notificationService.handleSnackBar('Item is successfully added in favorites!')
  }
  
 }
 handleCategories(){
  if(this.image().category == 'AstroPhoto'){
    return 'Astro-photography'
  }else if(this.image().category == 'ArtAndDesigns'){
    return 'Art & design'
  }else if(this.image().category == 'CharcoalAndChalkAndPastel'){
    return 'Charcoal,chalk & pastel'
  }else if(this.image().category == 'BlackAndWhite'){return 'Black & white'}
  return
 }
}
