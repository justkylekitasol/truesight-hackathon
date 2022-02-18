import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from 'rxjs/operators'
import { IBattleData } from "./battledata";

@Injectable({
    providedIn: 'root'
})
export class PredictService {
    private predictUrl = 'http://localhost:8080/api/v1/battle-data/'
    private predictUrl1 = 'http://localhost:8080/api/v1/predict/'

    constructor(private http: HttpClient){

    }

    getProducts(): Observable<IBattleData[]>{
         return this.http.get<IBattleData[]>(this.predictUrl).pipe(
             tap(data => console.log('All: ', JSON.stringify(data))),
             catchError(this.handleError)
         );

        //  return this.http.get<IBattleData[]>(this.predictUrl).pipe(
        //      tap(data => console.log('All: ', JSON.stringify(data))),
        //      catchError(this.handleError)
        //  );

        //return this.http.post<any>(url, body, null).pipe( catchError(this.handleError('handle_error', any)) );
        //return this.http.post<any>(url, body, null).pipe( catchError(this.handleError('handle_error', any)) );
    }

    getPredictionJson(battleDataJson: string): Observable<IBattleData[]>{
      const headers = { 'Content-Type': 'application/json'}
      const body=battleDataJson;
      console.log(body)
      return this.http.post<IBattleData[]>(this.predictUrl1, body, {'headers':headers});
  }

    private handleError(err: HttpErrorResponse){
        let errorMessage = ' ';

        if (err.error instanceof ErrorEvent) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage)
    }
}
