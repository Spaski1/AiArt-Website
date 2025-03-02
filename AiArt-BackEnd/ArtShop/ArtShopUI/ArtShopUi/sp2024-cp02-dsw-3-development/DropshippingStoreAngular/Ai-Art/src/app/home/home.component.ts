import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIcon, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  selectedIndex: number = 3;
  items = [
    {
      src: 'https://i.pinimg.com/564x/c3/40/95/c34095464ffd594eb762e7cfdb3de49c.jpg',
    },
    {
      src: 'https://i.pinimg.com/564x/70/18/d3/7018d399f8a78ec07740a7f373797508.jpg',
    },
    {
      src: 'https://i.pinimg.com/736x/fa/0a/2f/fa0a2f7af167a0ff69d534f8f9caba83.jpg',
    },
    {
      src: 'https://i.pinimg.com/564x/3f/a3/b9/3fa3b984fd38b6d68a6d6dd65705b639.jpg',
    },
    {
      src: 'https://i.pinimg.com/564x/30/0a/9c/300a9ce34950bc999ec1599c48815e5d.jpg',
    },
    {
      src: 'https://i.pinimg.com/564x/f4/1e/f2/f41ef2c2f5c26508abfb7dca54196108.jpg',
    },
    {
      src: 'https://i.pinimg.com/564x/6c/65/d4/6c65d42d82253922b1518ebb35dcd280.jpg',
    },
  ];

  ngOnInit(): void {}

  moveToSelected(direction: string): void {
    if (direction === 'next') {
      this.selectedIndex = (this.selectedIndex + 1) % this.items.length;
    } else if (direction === 'prev') {
      this.selectedIndex =
        (this.selectedIndex - 1 + this.items.length) % this.items.length;
    }
  }

  isClassApplied(index: number, className: string): boolean {
    const totalItems = this.items.length;
    const prevIndex = (this.selectedIndex - 1 + totalItems) % totalItems;
    const nextIndex = (this.selectedIndex + 1) % totalItems;
    const prevLeftSecond = (this.selectedIndex - 2 + totalItems) % totalItems;
    const nextRightSecond = (this.selectedIndex + 2) % totalItems;

    switch (className) {
      case 'selected':
        return index === this.selectedIndex;
      case 'prev':
        return index === prevIndex;
      case 'next':
        return index === nextIndex;
      case 'prevLeftSecond':
        return index === prevLeftSecond;
      case 'nextRightSecond':
        return index === nextRightSecond;
      case 'hideLeft':
        return index < prevLeftSecond;
      case 'hideRight':
        return index > nextRightSecond;
      default:
        return false;
    }
  }
}
