import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-data-filter',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './data-filter.html',
  styleUrl: './data-filter.css'
})
export class DataFilter {
 days = [
    { key: 'monday', label: 'Segunda', selected: false },
    { key: 'tuesday', label: 'Terça', selected: false },
    { key: 'wednesday', label: 'Quarta', selected: false },
    { key: 'thursday', label: 'Quinta', selected: false },
    { key: 'friday', label: 'Sexta', selected: false },
    { key: 'saturday', label: 'Sábado', selected: false },
    { key: 'sunday', label: 'Domingo', selected: false },
  ];

  @Output() daysSelected = new EventEmitter<string[]>();

  toggleDay(dayKey: string, checked: boolean) {
    const day = this.days.find(d => d.key === dayKey);
    if (day) {
      day.selected = checked;
      this.emitSelectedDays();
    }
  }

  private emitSelectedDays() {
    const selectedKeys = this.days
    .filter(d => d.selected)
    .map(d => d.key);
    this.daysSelected.emit(selectedKeys);
  }
}
