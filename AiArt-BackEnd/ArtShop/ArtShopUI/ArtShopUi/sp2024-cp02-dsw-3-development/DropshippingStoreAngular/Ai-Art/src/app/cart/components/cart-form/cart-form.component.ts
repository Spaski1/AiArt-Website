import { Component, effect, inject, input, signal } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Image } from '../../../types/image.interface';
import { catchError, of, Subscription } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { AppStore } from '../../../store/app.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-form',
  standalone: true,
  imports: [MatFormFieldModule,MatSelectModule, MatInputModule,MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './cart-form.component.html',
  styleUrl: './cart-form.component.css'
})
export class CartFormComponent {
  appStore = inject(AppStore)
  formUntouched = signal<string>('')
  purchaseError = signal(false)
  purchasePassed = signal(false)
  subscription = new Subscription()
  checkout: FormGroup
  constructor(private readonly cartService: CartService, private readonly router: Router){
    effect(()=>{},{allowSignalWrites:true})
  }
  ngOnInit(){
    this.checkout = new FormGroup({
      
      fullName: new FormControl('',[Validators.required, Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      cardNo: new FormControl('',[Validators.required,Validators.minLength(16), Validators.maxLength(16),Validators.pattern(/^[0-9]\d*$/)]),
      cardDate: new FormControl('', [Validators.required, Validators.pattern(/^(11|12)\/24$|^(0[1-9]|10|11|12)\/2[5-9]$/), ]),
      cvvNo: new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{3}$/)])
    })
  }
  errorMessage = signal('');
 

  checkoutSubmit(){
    console.log(this.checkout)
    this.resetErrorsMessages()
    if(!this.checkout.touched){
      this.formUntouched.set('You must fill all fields.')
      return 
    } 
    if(this.checkout.invalid)return
     let itemsFromCartID = this.appStore.cart().map((item)=>item.id)
    console.log(itemsFromCartID)
    
      this.subscription = this.cartService.checkoutGuest(itemsFromCartID).pipe(
        catchError((error)=>{
          console.log(error)
          return of(null)
        })
      ).subscribe((response)=>{console.log(response)
        if(response?.isChecked == true){
          this.purchasePassed.set(true)
        }else{
          this.purchaseError.set(true)
        }
      })
    
    

  }
  handleBackToProducts(){
    this.appStore.resetCart()
    this.router.navigate(['/categories'])
  }
  checkDate(date:string){
    if(date.charAt(0)==='0'){
      return true
    }
    return false
  }

  resetErrorsMessages(){
    this.formUntouched.set('')
    
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
