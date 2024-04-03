import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { ComplexFormValue } from '../models/complex-form-value.model';
import { environment } from '../../../environments/environment.development';

@Injectable()
export class ComplexFormService {
  constructor(private http: HttpClient) {}

  saveUserInfo(formValue: ComplexFormValue): Observable<boolean> {
    return this.http.post(`${environment.apiUrl}/users`, formValue).pipe(
      map(() => true),
      delay(1000), //delay to simulate fake server response time
      catchError(() => of(false).pipe(delay(1000))) //simulation network error
    );
  }
}
