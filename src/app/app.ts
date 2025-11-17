import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Table } from './components/table/table';
import { ScheduleItem } from './models/schedule.model';
import { Searchbox } from './components/searchbox/searchbox';
import { DataFilter } from './components/data-filter/data-filter';
import { Footer } from './components/footer/footer';
import { PocketbaseService } from './services/pocketbase.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Table, Searchbox, DataFilter, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  protected readonly title = signal('portal-de-matriculas');

  private allAvailableSubjects: ScheduleItem[] = [];
  availableSubjects: ScheduleItem[] = [];

  enrolledSubjects: ScheduleItem[] = [];
  private selectedDays: string[] = [];

  constructor(private pb: PocketbaseService) {}

  async ngOnInit() {
    this.allAvailableSubjects = await this.pb.getSchedules();
    this.availableSubjects = [...this.allAvailableSubjects];
  }

  onDaysSelected(days: string[]) {
    this.selectedDays = days;
    this.applyFilter();
  }

  private applyFilter() {
    if (this.selectedDays.length === 0) {
      this.availableSubjects = [...this.allAvailableSubjects];
    } else {
      this.availableSubjects = this.allAvailableSubjects.filter(subject =>
        subject.dayKeys.some(dayKey => this.selectedDays.includes(dayKey))
      );
    }
  }

  onSearchChange(query: string) {
    const lower = query.toLowerCase();
    let filtered = [...this.allAvailableSubjects];

    if (this.selectedDays.length > 0) {
      filtered = filtered.filter(subject =>
        subject.dayKeys.some(dayKey => this.selectedDays.includes(dayKey))
      );
    }

    if (lower) {
      filtered = filtered.filter(subject =>
        subject.subject.toLowerCase().includes(lower)
      );
    }

    this.availableSubjects = filtered;
  }

  onSubjectToggle(subject: ScheduleItem) {
    if (subject.selected) {
      if (!this.enrolledSubjects.find(s => s.id === subject.id)) {
        this.enrolledSubjects.push({ ...subject });
      }
    } else {
      this.enrolledSubjects =
        this.enrolledSubjects.filter(s => s.id !== subject.id);
    }
  }
}
