import { Component, signal } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Artist } from '../../types/artist.interface';
import { CommonModule } from '@angular/common';
import { UserInfo } from '../../types/user-info.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  userInfo = signal<UserInfo | null>(null)

  constructor(private readonly accountService: AccountService){

  }

  ngOnInit() {
    this.accountService.getUserInfo().subscribe({
      next: (data) => {
        console.log('User info response:', data);
        this.userInfo.set(data.userInfo);
      },
      error: (error) => {
        console.error('Error fetching user info', error);
      },
      complete: () => {
        console.log('User info fetch complete');
      }
    });
  }
  
}
