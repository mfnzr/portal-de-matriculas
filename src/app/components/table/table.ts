import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScheduleItem } from '../../models/schedule.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class Table {
  //Input() permite que um componente filho receba dados do componente pai
  //aqui no caso o componente pai é o app.ts que tem uma lista de disciplinas
  //ou seja, o componente pai passa a lista atrvés do Input()
  @Input() schedule: ScheduleItem[] = [];
  @Input() title: string = '';
  @Input() showCheckbox: boolean = true;

  //Output() permite que um componente filho envie dados para o componente pai
  //ou seja avisa o componente pai quando algo acontece;
  //A tabela "avisa" o componente pai que foi marcado uma disciplina
  @Output() itemToggle = new EventEmitter<ScheduleItem>();

  onCheckboxChange(item: ScheduleItem, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    item.selected = checkbox.checked;
    this.itemToggle.emit(item); //aqui emite o evento para o componente pai dizendo que a checkbox foi alterada
  }
}
