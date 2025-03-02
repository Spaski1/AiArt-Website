import { Component, effect, inject } from '@angular/core';
import { AppStore } from '../../../store/app.store';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Creation } from '../../../types/creation.interface';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../../loader/loader.component";
import { GeneratorService } from '../../../services/generator.service';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-list-image-form',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, MatTabsModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, LoaderComponent],
  templateUrl: './list-image-form.component.html',
  styleUrl: './list-image-form.component.css'
})
export class ListImageFormComponent {
  
  appStore = inject(AppStore)
  creationForm: FormGroup
  desc = this.appStore.prompt()
  subscription= new Subscription()

  
  constructor(private router: Router, private readonly generatorService:GeneratorService, private readonly notificationService:NotificationService){
    effect(()=>{

    },{allowSignalWrites: true})
  }
  ngOnInit(){
    this.creationForm = new FormGroup({
      description: new FormControl(`${this.appStore.prompt()}`,Validators.required),
      price: new FormControl('',[Validators.required]),
      category: new FormControl('', [Validators.required])
    })
    
  }

  handleSubmit(){
    if(!this.creationForm.valid){
      this.notificationService.handleSnackBar('All field are required. Please fill all fields!')
      return
    }
    const requestBody:Creation = {
      category: Number(this.creationForm.get('category')?.value),
      description: this.creationForm.get('description')?.value,
      price: String(this.creationForm.get('price')?.value),
      stock: true,
      imageUrl: this.appStore.stringifyCreationImage()
    }
    console.log(requestBody)

    
    this.subscription = this.generatorService.addGeneratedImage(requestBody).subscribe((data)=>
    {
      console.log('i am here')
      console.log(data)
      if(data?.message){
        const{message} = data
        this.appStore.setPrompt('')
        this.appStore.setStringifyCreationImage('')
        this.router.navigate(['/generate-your-art'])
        this.notificationService.handleSnackBar(message)
      }else{
        this.notificationService.handleSnackBar('Error while adding image. Please try again!')
      }
    }
    )
  }

  handleRemove(){
    this.appStore.setStringifyCreationImage('')
    this.appStore.setPrompt('')
    this.router.navigate(['/generate-your-art'])
  }
  
}
