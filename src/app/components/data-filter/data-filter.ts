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
    { key: 'monday', label: 'Segunda-feira', selected: false },
    { key: 'tuesday', label: 'Terça-feira', selected: false },
    { key: 'wednesday', label: 'Quarta-feira', selected: false },
    { key: 'thursday', label: 'Quinta-feira', selected: false },
    { key: 'friday', label: 'Sexta-feira', selected: false },
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
