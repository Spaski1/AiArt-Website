import { Component, effect, inject, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppStore } from '../../../store/app.store';
import { GeneratorService, ResponseApi } from '../../../services/generator.service';
import {Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { NotificationService } from '../../../services/notification.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-prompt',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,ReactiveFormsModule, MatButtonModule, FormsModule],
  templateUrl: './prompt.component.html',
  styleUrl: './prompt.component.css'
})
export class PromptComponent {
  isLoading = signal(false)
  appStore = inject(AppStore)
  promptForm: FormGroup
  subscription = new Subscription
  image: SafeUrl | null = null
  constructor(private generatorService: GeneratorService,private readonly notificationService: NotificationService, private readonly router: Router) { 
    effect(()=>{

    }, {allowSignalWrites: true})
  }
  ngOnInit(){
    this.promptForm = new FormGroup({
      promptValue: new FormControl(`${this.appStore.prompt()}`,[Validators.required])
    })
  }
  generateImage() {
    console.log(this.promptForm)
    if(!this.promptForm.valid){
      this.notificationService.handleSnackBar('Please enter a valid value in the field.')
      console.log('i am here')
      return
    }
    const value :string = this.promptForm.get('promptValue')?.value
    if(!value || value.trim() == ''){
      console.log('i am here 2')
      this.notificationService.handleSnackBar('Please enter a valid value in the field.')
      return
    }
    this.appStore.setIsLoading(true)
    this.subscription = this.generatorService.sendGenerationRequest(value).subscribe(
      (data: ResponseApi | null) => {
        if(data && data.image){
          const base64Image = `data:image/png;base64,${data.image}`
          this.appStore.setStringifyCreationImage(base64Image)
          this.appStore.setIsLoading(false)
          this.notificationService.handleSnackBar('You art is successfully created!')
          this.appStore.setPrompt(value)
          this.router.navigate(['/generate-your-art/list-for-sale'])
        }     
      }
    );
  }
}
