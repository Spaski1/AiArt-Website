import { Component, effect, inject } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { AppStore } from '../store/app.store';
import { MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { AsyncPipe, CommonModule } from '@angular/common';
import { CardContainerComponent } from './components/card-container/card-container.component';
import { FiltersComponent } from './components/filters/filters.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SearchComponent } from './components/search/search.component';
import { SearchImagesQuery } from '../types/searchImagesQuery.interface';
import { LoaderComponent } from '../loader/loader.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [AsyncPipe, CommonModule,FooterComponent,LoaderComponent, CardContainerComponent, MatPaginatorModule, FiltersComponent, GalleryComponent, SearchComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  readonly productStore = inject(AppStore)
  
  subscription: Subscription = new Subscription()
  subscriptionArtists: Subscription = new Subscription()
  constructor(private readonly categoryService: CategoriesService){
    effect(()=>{
      this.productStore.setIsLoading(true)
      this.getImages(this.productStore.searchParams())
    },{allowSignalWrites:true})
  }
  
  getImages(searchQuery: SearchImagesQuery = {}){
    this.subscription = this.categoryService.getImages(searchQuery).subscribe((response)=>{
      console.log(response)
      const {paginatedImages} = response
      console.log('paginated images',paginatedImages)
      this.productStore.setTotal(paginatedImages.totalCount)
      this.productStore.setProducts(paginatedImages.data)
      this.productStore.setPageSize(paginatedImages.pageSize)
      this.productStore.setIsLoading(false)
    })
    
  }

  handlePage(event: PageEvent){
    this.productStore.setPage(event.pageIndex + 1)
    document.getElementById('products')?.scrollIntoView()
  }
  ngOnInit(){
    this.subscriptionArtists = this.categoryService.getArtist().pipe(
      map((data)=>{
        const{users} = data
       return users.map((item)=>{return item.userName})
      })
    ).subscribe((artists)=>{this.productStore.setArtists(artists)})
  
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
