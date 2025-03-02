import { Component, input, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [RouterLink, MatButtonModule],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {
  openCertificate = input.required<WritableSignal<boolean>>()
  handleOpenCertificate(){
    this.openCertificate().update((v)=> !v)
  }
}
