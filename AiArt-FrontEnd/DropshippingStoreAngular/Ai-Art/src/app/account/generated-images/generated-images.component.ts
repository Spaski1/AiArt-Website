import { Component, signal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Image } from '../../types/image.interface';

@Component({
  selector: 'app-generated-images',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './generated-images.component.html',
  styleUrl: './generated-images.component.css'
})
export class GeneratedImagesComponent {
  soldImages = signal<Image[]>([]);
  isLoading = signal<boolean>(true);
  earns = signal<number>(0)
  constructor(private readonly accountService: AccountService){}

  ngOnInit(){
    this.fetchUserInfo()
  }
  fetchUserInfo(){
    this.accountService.getUserInfo().subscribe({
      next: (data) => {
        console.log('User info response:', data); 
        if (data && data.userInfo && data.userInfo.soldImages) {
          this.soldImages.set(data.userInfo.soldImages);
          this.earns.update((v)=>{
            let test = 0
            let p = this.soldImages().map(i=> {return Math.round((i.price / 100) * 5)}).forEach(i=> test += i)
            return test
          })
        } else {
          console.error('soldImages not found in the response');
        }
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error fetching user info', error);
        this.isLoading.set(false)
      },
      complete: () => {
        console.log('User info fetch complete');
        this.isLoading.set(false)
      }
    });
  }
}
