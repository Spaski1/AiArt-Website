import { Component } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { AlertComponent } from '../shared/alert/alert.component'
import { FooterComponent } from '../footer/footer.component'
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FooterComponent,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    CommonModule
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup
  successMessage: string = ''
  errorMessage: string = ''

  constructor (
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}(?: [a-zA-Z]+)?(?: [a-zA-Z]+)?$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{9,13}$/)]],
      message: ['', Validators.required]
    })
  }

  onSubmit () {
    if (this.contactForm.valid) {
      const formData = new FormData()
      formData.append('access_key', '64443cbf-ca3a-48bb-9757-e409c4c45a11') // Replace with your Web3Forms access key
      formData.append('name', this.contactForm.get('name')?.value)
      formData.append('email', this.contactForm.get('email')?.value)
      formData.append('phone', this.contactForm.get('phone')?.value)
      formData.append('message', this.contactForm.get('message')?.value)

      // Post form data to Web3Forms
      this.http.post('https://api.web3forms.com/submit', formData).subscribe({
        next: response => {
          this.openAlertDialog(
            'Success',
            'Your message has been sent successfully!'
          )
          this.contactForm.setValue({
            name: '',
            email: '',
            phone: '',
            message: ''
          }); // Reset the form on success
        },
        error: error => {
          this.openAlertDialog(
            'Error',
            'There was an error sending your message. Please try again later.'
          )
        }
      })
    }
  }
  openAlertDialog (title: string, message: string) {
    let dialogRef = this.dialog.open(AlertComponent, {
      width: '300px'
    })

    dialogRef.componentInstance.data = { title: title, message: message }
  }
}
