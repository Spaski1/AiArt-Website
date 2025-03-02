import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Image } from '../types/image.interface';
import { NotificationService } from './notification.service';
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private _favorites = new BehaviorSubject<Image[]>([])
  $favorites = this._favorites.asObservable()
  constructor(private readonly notificationService: NotificationService) { }

  
  addInFavorites(image:Image){
    const favorites = this._favorites.getValue()
    console.log('iam here')
    if(favorites.find(i=>i.id==image.id)){
      return
    }
    this._favorites.next([...favorites, image])
    this.notificationService.handleSnackBar('Item is successfully added in favorites!')
  }


  removeFromFavorites(imageID: string){
    const favorites = this._favorites.getValue().filter((i)=>i.id !== imageID)
    this._favorites.next([...favorites])
    
  }

  favoritesLength(){
    return this._favorites.getValue().length
  }

}
