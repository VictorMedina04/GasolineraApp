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
  @Input() priceRange: { min: number, max: number } = { min: 0, max: 100 };

  filteredGasolineras: Gasolinera[] | undefined;


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
  }
   ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedFuelType'] || changes['priceRange']) {
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
      let price = 0;
      if (this.selectedFuelType === 'sinPlomo95') {
        price = gasolinera.price95;
      } else if (this.selectedFuelType === 'sinPlomo98') {
        price = gasolinera.price98;
      } else if (this.selectedFuelType === 'gasoleoA') {
        price = gasolinera.priceDiesel;
      } else if (this.selectedFuelType === 'gasoleoPremium') {
        price = gasolinera.priceGasoleoPremium;
      }
      return price >= this.priceRange.min && price <= this.priceRange.max;
    });
  }
}

