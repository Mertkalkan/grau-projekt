import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Locations } from 'src/app/models/locations';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  hystreetApi = 'https://hystreet.com/api'

  constructor(private http: HttpClient) { }

   // Http Options
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/vnd.hystreet.v1',
      'X-API-Token': 'g8GKGqRiWrgMgM4WcVNrjLdv',
      'Access-Control-Allow-Origin':'*',
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
    })
  } 
  
   // HttpClient API get() method
   getLocations(): Observable<Locations> {
    return this.http.get<Locations>(this.hystreetApi + '/locations/95', this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

    // Error handling 
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
      let errorMessage = '';
      if(error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      window.alert(errorMessage);
      return throwError(errorMessage);
   }
}
