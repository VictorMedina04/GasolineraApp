import { Component, Input, SimpleChanges } from '@angular/core';
import { Gasolinera } from '../../models/gas-item.dto';
import { GasService } from '../../services/gas.service';

@Component({
  selector: 'app-gas-list',
  templateUrl: './gas-list.component.html',
  styleUrl: './gas-list.component.css'
})
export class GasListComponent {


  listadoGasolineras: Gasolinera[] = [];
  @Input() selectedFuelType: string = '';
  filteredGasolineras: Gasolinera[] | undefined;
  noResultsMessage: string = '';


  constructor(private gasService: GasService) { }

  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      // Transformo la respuesta del API en String (JSON)
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        // Transformo el String en un objeto JSON
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
        this.filteredGasolineras = this.listadoGasolineras;
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });

    this.gasService.codigoPostalActual.subscribe(postalCode => {
      if (postalCode) {
        this.filteredGasolineras = this.listadoGasolineras.filter(station => station.postalCode === postalCode);
      } else {
        this.noResultsMessage = 'No hay gasolineras con ese código postal';
      }
    });
    this.gasService.nombresActuales.subscribe(names => {
      if (names.length > 0) {
        this.filteredGasolineras = this.listadoGasolineras.filter(station => names.includes(station.nombre));
      } else {
        this.noResultsMessage = 'No hay gasolineras con ese nombre';      }
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFuelType']) {
      this.applyFilter();
    }
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      const gasolineraConNombresGuenos: any = {};

      // Recorro los nombres de los atributo de la
      // gasolineraChusquera que están mal escritos
      /*Object.keys(gasolineraChusquera).forEach((key) => {
        // En la variable key tengo el nombre de la
        // propiedad que estoy recorriendo
        if (key === 'C.P.') {
          gasolineraConNombresGuenos['postalCode'] = gasolineraChusquera[key];
        }
      });
      */
      let gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        gasolineraChusquera['Precio Gasolina 95 E5'],
        gasolineraChusquera['Precio Gasoleo A'],
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Horario'],
        gasolineraChusquera['Precio Gasoleo Premium'],
        gasolineraChusquera['Precio Gasolina 98 E5']
      );

      newArray.push(gasolinera);
    });
    return newArray;
  }
  applyFilter(): void {
    this.filteredGasolineras = this.listadoGasolineras.filter(gasolinera => {
      if (this.selectedFuelType === '') {
        return true; // Mostrar todas las gasolineras
      } else if (this.selectedFuelType === 'sinPlomo95') {
        return gasolinera.price95 !== undefined;
      } else if (this.selectedFuelType === 'sinPlomo98') {
        return gasolinera.price98 !== undefined;
      } else if (this.selectedFuelType === 'gasoleoA') {
        return gasolinera.priceDiesel !== undefined;
      } else if (this.selectedFuelType === 'gasoleoPremium') {
        return gasolinera.priceGasoleoPremium !== undefined;
      }
      return false;
    });
  }

  
  
}

