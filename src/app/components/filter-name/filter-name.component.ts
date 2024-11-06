import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filter-name',
  templateUrl: './filter-name.component.html',
  styleUrl: './filter-name.component.css'
})
export class FilterNameComponent {

  selectedNames: string[] = [];
  @Output() namesChange = new EventEmitter<string[]>();

  onCheckboxChange(event: any, name: string) {
    if (event.target.checked) {
      this.selectedNames.push(name);
    } else {
      const index = this.selectedNames.indexOf(name);
      if (index > -1) {
        this.selectedNames.splice(index, 1);
      }
    }
    this.namesChange.emit(this.selectedNames);
  }
}
