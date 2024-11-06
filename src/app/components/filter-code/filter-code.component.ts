import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-code',
  templateUrl: './filter-code.component.html',
  styleUrl: './filter-code.component.css'
})
export class FilterCodeComponent {

  postalCode: string = '';
  @Output() postalCodeChange = new EventEmitter<string>();

  filterGasStations() {
    this.postalCodeChange.emit(this.postalCode);
  }

}


