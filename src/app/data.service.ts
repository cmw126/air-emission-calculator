import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "x-rapidapi-host": "greatcirclemapper.p.rapidapi.com",
      "x-rapidapi-key": "94d5ad4d8emshefb0a656033a11dp17b138jsn08c6e8670644",
      "vary": "Accept-Encoding",
      "content-type": "text/html;charset=UTF-8"
    })
  }  

  constructor(private http: HttpClient) {
    // this.getJSON().subscribe( data => {
    //   console.log(data);
    // });
  }

  // HttpClient API get() method => Fetch employee
  getDistance(): Observable<any> {
    return this.http.get('https://greatcirclemapper.p.rapidapi.com/airports/route/EGLL-KJFK/510', this.httpOptions)
    .pipe(retry(1),catchError(this.handleError));
  }  

  // Error handling 
  handleError(error) {
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
