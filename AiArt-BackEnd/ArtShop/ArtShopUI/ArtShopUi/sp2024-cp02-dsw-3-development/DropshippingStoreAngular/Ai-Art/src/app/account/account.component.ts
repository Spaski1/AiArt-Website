import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppStore } from '../store/app.store';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterModule ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  appStore = inject(AppStore)
  constructor(private readonly authService: AuthService, private router: Router){
  }
  
  handleLogout(){
    this.appStore.setUser(undefined)
    this.appStore.resetCart()
    this.appStore.resetRecentOpen()
    this.appStore.resetFavorites()
    this.authService.logout()
    this.router.navigate(['/'])
    
  }
}
