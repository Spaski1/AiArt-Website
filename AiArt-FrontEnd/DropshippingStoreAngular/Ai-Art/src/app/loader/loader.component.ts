import { Component, inject, input } from '@angular/core';
import {MatProgressSpinner} from '@angular/material/progress-spinner'
import { AppStore } from '../store/app.store';
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
 appStore = inject(AppStore)
}

