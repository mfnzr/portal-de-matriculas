import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PocketbaseService } from '../../services/pocketbase.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  ra: string = '';
  password: string = '';
  error: string = '';

  constructor(private auth: PocketbaseService) {}

  async onSubmit() {
    this.error = '';
    try {
      await this.auth.login(this.ra, this.password);
    } catch {
      this.error = 'RA ou senha inválidos.';
    }
  }
}
