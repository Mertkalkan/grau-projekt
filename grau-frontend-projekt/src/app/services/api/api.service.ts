import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService{

  // Define API
  apiURL = 'https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_COVID19/FeatureServer/0/query?where=1%3D1&outFields=Bundesland,AnzahlFall,Datenstand,Meldedatum&outSR=4326&f=json';

  constructor(private http: HttpClient) { }

  getData():  Observable<any>{
    return this.http.get<any>(this.apiURL)
   
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
function retry(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}

function catchError(handleError: (error: { error: { message: string; }; status: any; message: any; }) => import("rxjs").Observable<never>): import("rxjs").OperatorFunction<unknown, unknown> {
  throw new Error('Function not implemented.');
}

