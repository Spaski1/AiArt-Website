import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { UniqueWorkComponent } from './components/unique-work/unique-work.component';
import { CertificateComponent } from './components/certificate/certificate.component';
import { Image } from '../../../types/image.interface';
import { CategoriesService } from '../../../services/categories.service';
import { AppStore } from '../../../store/app.store';
import { NotificationService } from '../../../services/notification.service';
import { FooterComponent } from '../../../footer/footer.component';
import { RecentOpenComponent } from './components/recent-open/recent-open.component';


@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [AsyncPipe,UniqueWorkComponent,CertificateComponent, RecentOpenComponent ,MatChipsModule,FooterComponent,MatIconModule,CurrencyPipe, MatButtonModule, RouterLink, MatExpansionModule, CommonModule],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent {
  appStore = inject(AppStore)
  openUniqueWork = signal(false)
  panelOpenState = signal(false);
  openRoom = signal(false)
  openCertificate = signal(false)
  product : Image
  category: string | undefined
  subscription= new Subscription()
  constructor(private readonly productsService: CategoriesService,private router: Router, private readonly route: ActivatedRoute, private notificationService: NotificationService){
    effect(()=>{},{allowSignalWrites:true})
  }
  ngOnInit(){
    this.getProduct()  
    scroll(0,120)  
  }

 
  getProduct(){
    this.subscription = this.route.params.pipe(
      switchMap((params)=> this.productsService.getImage(params['id']))).subscribe((v)=>{ this.product = v.image
        console.log('product',this.product)
        console.log('v',v)
        this.category=this.productsService.handleProductCategory(this.product)
        
      }
    )
   
  }
  handleAccordion(){
    this.panelOpenState.update((v=>!v))
  }

  handleRoom(){
    this.openRoom.update(v=> !v)
    
  }
  handleUniqueWork(){
    this.openUniqueWork.update(v=>!v)
    console.log(this.openUniqueWork())
  }
  handleAddToCart(item:Image){
    if(!this.appStore.cart().find((i)=>i.id===item.id)){
    this.appStore.setCart(item)}
  }
  handleAddToFavorites(item:Image){
    if(!this.appStore.favorites().find((i)=>i.id===item.id)){
    this.appStore.setFavorites(item)
    this.notificationService.handleSnackBar('Item is successfully added in favorites!')
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe()
    let test =this.checkRecent()
        if(!test){
          this.appStore.setRecentOpen(this.product)
        }
    
  }
  checkRecent(){
    let check = this.appStore.recentOpen().find(item=>item.id == this.product.id)
    return check
  }
  goBack(){
    this.router.navigate(['/categories'])
    
  }
}
