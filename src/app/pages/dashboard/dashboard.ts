import { Component, OnInit, signal } from '@angular/core';
import { ScheduleItem } from '../../models/schedule.model';
import { PocketbaseService } from '../../services/pocketbase.service';
import { Navbar } from '../../components/navbar/navbar';
import { Table } from '../../components/table/table';
import { Searchbox } from '../../components/searchbox/searchbox';
import { DataFilter } from '../../components/data-filter/data-filter';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-dashboard',
  imports: [Navbar, Table, Searchbox, DataFilter, Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

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
