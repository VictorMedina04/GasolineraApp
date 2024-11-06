import { Component } from '@angular/core';
import { GasService } from '../../services/gas.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  selectedFuelType: string = '';
  selectedFuelTypeCode: string = '';

  constructor(private gasService: GasService) { }

  onFilterChanged(type: string): void {
    this.selectedFuelType = type;
  }
  onPostalCodeChange(postalCode: string) {
    this.gasService.changePostalCode(postalCode);
  }
  onNamesChange(names: string[]) {
    this.gasService.changeNames(names);
  }
}
