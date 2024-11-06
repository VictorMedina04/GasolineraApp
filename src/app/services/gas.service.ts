import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GasService {

  constructor(private http: HttpClient) { }

  getGasList() {
    return this.http.get(
      'https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/'
    );
  }
  private postalCodeOriginal = new BehaviorSubject<string>('');
  codigoPostalActual = this.postalCodeOriginal.asObservable();

  changePostalCode(postalCode: string) {
    this.postalCodeOriginal.next(postalCode);
  }
}
