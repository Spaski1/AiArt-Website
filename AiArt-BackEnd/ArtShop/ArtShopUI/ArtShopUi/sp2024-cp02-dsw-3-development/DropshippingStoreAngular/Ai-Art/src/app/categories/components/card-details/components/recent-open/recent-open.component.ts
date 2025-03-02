import { Component, inject } from '@angular/core';
import { AppStore } from '../../../../../store/app.store';
import {MatDividerModule} from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { Image } from '../../../../../types/image.interface';


@Component({
  selector: 'app-recent-open',
  standalone: true,
  imports: [MatDividerModule, RouterLink],
  templateUrl: './recent-open.component.html',
  styleUrl: './recent-open.component.css'
})
export class RecentOpenComponent {
  appStore = inject(AppStore)
  recent= this.appStore.recentOpen().reverse().slice(0,6)
  constructor(){}
  ngOnInit(){
    
    console.log(this.appStore.recentOpen())
    
  }
  
}
