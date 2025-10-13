import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Table } from './components/table/table';
import { ScheduleItem } from './models/schedule.model';
import { Searchbox } from './components/searchbox/searchbox';
import { DataFilter } from './components/data-filter/data-filter';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Table, Searchbox, DataFilter, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portal-de-matriculas');

  // Lista completa de disciplinas disponíveis
  private allAvailableSubjects: ScheduleItem[] = [
    {
      id: 1,
      period: '3º',
      subject: 'Programação orientada a objetos',
      days: 'Segunda e terça',
      dayKeys: ['monday', 'tuesday'],
      hours: '18:40 e 18:40'
    },
    {
      id: 2,
      period: '3º',
      subject: 'Banco de dados',
      days: 'Quarta e quinta',
      dayKeys: ['wednesday', 'thursday'],
      hours: '18:40 e 18:40'
    },
    {
      id: 3,
      period: '3º',
      subject: 'DevOps',
      days: 'Terça e quinta',
      dayKeys: ['tuesday', 'thursday'],
      hours: '20:40 e 20:40'
    },
  ];

  // Lista filtrada que será exibida na tabela
  availableSubjects: ScheduleItem[] = [...this.allAvailableSubjects];

  enrolledSubjects: ScheduleItem[] = [];

  // Dias selecionados no filtro
  private selectedDays: string[] = [];

  // Método chamado quando dias são selecionados no filtro
  onDaysSelected(days: string[]) {
    this.selectedDays = days;
    this.applyFilter();
  }

  // Aplica o filtro de dias
  private applyFilter() {
    if (this.selectedDays.length === 0) {
      // Nenhum dia selecionado = mostra todas as disciplinas
      this.availableSubjects = [...this.allAvailableSubjects];
    } else {
      // Filtra disciplinas que têm aula nos dias selecionados
      this.availableSubjects = this.allAvailableSubjects.filter(subject =>
        subject.dayKeys.some(dayKey => this.selectedDays.includes(dayKey))
      );
    }
  }

  onSearchChange(query: string) {
    const lower = query.toLowerCase();

    // Começa sempre da lista completa
    let filtered = [...this.allAvailableSubjects];

    // Aplica o filtro de dias, se houver
    if (this.selectedDays.length > 0) {
      filtered = filtered.filter(subject =>
        subject.dayKeys.some(dayKey => this.selectedDays.includes(dayKey))
      );
    }

    // Aplica o filtro de busca, se houver texto digitado
    if (lower) {
      filtered = filtered.filter(subject =>
        subject.subject.toLowerCase().includes(lower)
      );
    }

    // Atualiza a lista exibida na tabela
    this.availableSubjects = filtered;
  }

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