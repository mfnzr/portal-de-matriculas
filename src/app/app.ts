import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Table } from './components/table/table';
import { ScheduleItem } from './models/schedule.model';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Table],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portal-de-matriculas');

  availableSubjects: ScheduleItem[] = [
    {id: 1, period: '3º', subject: 'Programação orientada a objetos', days: 'Segunda e terça', hours: '18:40 e 18:40'},
    {id: 2, period: '3º', subject: 'Banco de dados', days: 'Quarta e quinta', hours: '18:40 e 18:40'},
    {id: 3, period: '3º', subject: 'DevOps', days: 'Terça e quinta', hours: '20:40 e 20:40'},
  ]

  enrolledSubjects: ScheduleItem[] = [];

  onSubjectToggle(subject: ScheduleItem) {
    if (subject.selected) {
      if (!this.enrolledSubjects.find(s => s.id === subject.id)) {
        this.enrolledSubjects.push({...subject});
      }
    } else {
      this.enrolledSubjects = this.enrolledSubjects.filter(s => s.id !== subject.id);
    }
  }
}
