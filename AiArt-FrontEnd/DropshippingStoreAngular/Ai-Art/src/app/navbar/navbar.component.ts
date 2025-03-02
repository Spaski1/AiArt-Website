import { Component, inject, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatBadgeModule} from '@angular/material/badge';
import { FavoritesService } from '../services/favorites.service';
import { CartService } from '../services/cart.service';
import { Subscription } from 'rxjs';
import { AppStore } from '../store/app.store';


@Component({
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatBadgeModule,
    MatListModule,
    RouterModule,
    NgFor,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  appStore = inject(AppStore)
  @ViewChild('drawer') drawer: MatSidenav | undefined;
  constructor(){}
  
  
  
  closeSidenav(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }
}
