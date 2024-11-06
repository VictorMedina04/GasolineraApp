import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-type',
  templateUrl: './filter-type.component.html',
  styleUrl: './filter-type.component.css'
})
export class FilterTypeComponent {

  @Output() filterChanged: EventEmitter<string> = new EventEmitter<string>();

  filterGasoline(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.filterChanged.emit(selectElement.value);  }

}
