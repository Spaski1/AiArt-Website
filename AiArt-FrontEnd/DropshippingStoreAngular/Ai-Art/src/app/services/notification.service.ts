import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  _snackBar = inject(MatSnackBar)
  constructor() { }

  handleSnackBar(message: string,action?:string, duration:number = 2000){
    this._snackBar.open(message,action,{
      duration: duration,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    })
  }
}
