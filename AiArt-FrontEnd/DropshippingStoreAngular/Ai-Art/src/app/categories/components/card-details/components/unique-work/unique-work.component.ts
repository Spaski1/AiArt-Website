import { Component, input, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-unique-work',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './unique-work.component.html',
  styleUrl: './unique-work.component.css'
})
export class UniqueWorkComponent {
  uniqueWork = input.required<WritableSignal<boolean>>()
  handleUniqueWork(){
    this.uniqueWork().update((v)=> !v)
  }
}


