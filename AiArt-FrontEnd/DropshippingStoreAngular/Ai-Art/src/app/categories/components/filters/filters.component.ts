import { Component, input, output, OutputEmitterRef, signal } from '@angular/core';
import {MatRadioChange, MatRadioModule} from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';



@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [MatIconModule, MatExpansionModule, MatSelectModule, MatFormFieldModule,MatRadioModule] ,
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  
  selectedCategory = input.required<string | undefined>()
  selectedArtist = input.required<string | undefined>()
  selectedDirection = input.required<boolean>()
  inStock = input.required<boolean | undefined>()
  updateSelectCategory = output<any>()
  updateSelectedArtist = output<any>()
  updateSelectedDirection = output<any>()
  updateInStock = output<any>()
  artists = input<string[]>([])
  readonly panelOpenState = signal(false);
  handleAccordion(){
    this.panelOpenState.update((v)=>!v)
  }

  handleRadioBtns(event: MatRadioChange, emitter:OutputEmitterRef<any> ){
    console.log(event.value)
    emitter.emit(event.value)
  }

  handleChange(event:any, emitter:OutputEmitterRef<any>){
    emitter.emit(event)
  }


}
