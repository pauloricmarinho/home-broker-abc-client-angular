import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Valores } from '../models/valores';

@Injectable({
  providedIn: 'root'
})
export class BolsaValoresService {

  url = 'http://localhost:8080/home-broker-abc-api/valores-formatados'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem Dados da API
  getValores(): Observable<Valores[]> {
    return this.httpClient.get<Valores[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  };

  // Obtem Dados da API
  getValoresBolsa(){
    return this.httpClient.get(this.url);
  };

  getTeste(): boolean {
    return true ; 
  };

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    alert(errorMessage);
    return throwError(errorMessage);
  };

}
