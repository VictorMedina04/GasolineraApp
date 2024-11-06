import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  selectedFuelType: string = '';

  onFilterChanged(type: string): void {
    this.selectedFuelType = type;
  }
}
