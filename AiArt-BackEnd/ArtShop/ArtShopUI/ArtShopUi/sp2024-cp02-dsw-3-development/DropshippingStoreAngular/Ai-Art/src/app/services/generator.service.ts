import { Injectable } from '@angular/core';
import { environment, GENERATOR_API, STABILITY_KEY } from '../../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Creation } from '../types/creation.interface';

export interface ResponseApi {
  seed: number,
  image: string,
  finish_reason: string
}

@Injectable({
  providedIn: 'root'
})
export class GeneratorService {
  private generatePath = `${environment.API_IMAGES}addImage`
  constructor(private readonly http: HttpClient) { }

  sendGenerationRequest(prompt: string): Observable<ResponseApi | null> {
    const formData = new FormData();

    formData.append('prompt', `${prompt}`);
    formData.append('negative_prompt', `nature`);
    formData.append('aspect_ratio', `3:2`);
    formData.append('seed', `0`);
    formData.append('output_format', "png");

    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    const headers = new HttpHeaders({

      'Authorization': `Bearer ${STABILITY_KEY}`,

    });
    
    return this.http.post<ResponseApi>(GENERATOR_API, formData, { headers }).pipe(
      catchError((error) => {
        console.error('Error generating image: ', error)
        return of(null)
      })
    );
  
  }

  addGeneratedImage(requestBody: Creation){
    return this.http.post<{message: string}>(this.generatePath, requestBody, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).pipe(
      catchError(error=>{
        console.error(error)
        return of(null)
      }
    ))
  }
}
