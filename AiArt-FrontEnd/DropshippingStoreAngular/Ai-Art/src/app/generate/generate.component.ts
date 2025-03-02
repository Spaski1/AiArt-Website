import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { PromptComponent } from "./components/prompt/prompt.component";
import { ListImageFormComponent } from './components/list-image-form/list-image-form.component';
import { LoaderComponent } from '../loader/loader.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-generate',
  standalone: true,
  imports: [MatTabsModule, PromptComponent, ListImageFormComponent, LoaderComponent, MatIcon],
  templateUrl: './generate.component.html',
  styleUrl: './generate.component.css'
})
export class GenerateComponent {
   
}
