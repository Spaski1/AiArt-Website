import { Component, input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from '../card/card.component';
import { Image } from '../../../types/image.interface';


@Component({
  selector: 'app-card-container',
  standalone: true,
  imports: [CardComponent,MatGridListModule],
  templateUrl: './card-container.component.html',
  styleUrl: './card-container.component.css'
})
export class CardContainerComponent {
  products = input<Image[]>()
  breakpoint: number = 0;
   ngOnInit() {
    this.calculateBreakpoint();
  }

  calculateBreakpoint(innerWidth: number = window.innerWidth) {
    if (innerWidth <= 480) {
      this.breakpoint = 1;
    } else if (innerWidth <= 768) {
      this.breakpoint = 2
    } else if (innerWidth <= 1024) {
      this.breakpoint = 3
    } else if (innerWidth <= 1300) {
      this.breakpoint = 4
    } else {
      this.breakpoint = 5
    }
  }

  onResize(event: any) {
    this.calculateBreakpoint(event.target.innerWidth);
  }


}
