import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-by-price',
  templateUrl: './filter-by-price.component.html',
  styleUrl: './filter-by-price.component.css'
})
export class FilterByPriceComponent {
  @Output() priceRangeChanged: EventEmitter<{ min: number, max: number }> = new EventEmitter<{ min: number, max: number }>();

  min = 1.00;
  max = 2.00;
  step = 0.01;
  thumbLabel = true;
  showTicks = true;
  minValue = 1.00;
  maxValue = 2.00;

  onPriceChange(): void {
    this.priceRangeChanged.emit({ min: this.minValue, max: this.maxValue });
  }
}
