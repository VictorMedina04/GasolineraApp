import { Component } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  priceRange: { min: number, max: number } = { min: 1.00, max: 2.00 };
  selectedFuelType: string = '';

  onFilterChanged(type: string): void {
    this.selectedFuelType = type;
  }

  onPriceRangeChanged(range: { min: number, max: number }): void {
    this.priceRange = range;
  }
}
