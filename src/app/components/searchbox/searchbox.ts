import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  imports: [],
  standalone: true,
  templateUrl: './searchbox.html',
  styleUrl: './searchbox.css'
})
export class Searchbox {
@Output() searchChange = new EventEmitter<string>();

onSearch(value: string) {
  this.searchChange.emit(value);
}
}
