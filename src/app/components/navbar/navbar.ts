import { Component } from '@angular/core';
import PocketBase from 'pocketbase';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private pb = new PocketBase('http://127.0.0.1:8090');

  async logout() {
    this.pb.authStore.clear();
    console.log('Usuário deslogado');
    window.location.href = '/login';
  }
}
