import { Component, effect, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Image } from '../../../types/image.interface';
import { AppStore } from '../../../store/app.store';
import { NotificationService } from '../../../services/notification.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-table',
  standalone: true,
  imports: [CurrencyPipe, MatButtonModule, MatTableModule, MatIconModule, RouterLink],
  templateUrl: './cart-table.component.html',
  styleUrl: './cart-table.component.css'
})
export class CartTableComponent {
  appStore = inject(AppStore)
  totalPrice: number
  displayedColumns: string[] = ['product', 'description', 'price', 'remove' ]
  constructor(private readonly notificationService: NotificationService){
    effect(()=>{},{allowSignalWrites:true})
  }
  ngOnInit(){
    
      this.calculateTotal()
    
  }

  handleRemoveFromList(item: Image){
    let filtered = this.appStore.cart().filter(i=>i!==item)
    this.appStore.removeFromCart(filtered)
    this.notificationService.handleSnackBar('Item is successfully removed from cart!')
    this.calculateTotal()
   }

   calculateTotal(){
    let prices = this.appStore.cart().map((i)=>i.price)
    let calc = 0
    for(let price of prices){
      calc += price
    }
    this.totalPrice = calc
   }
}
