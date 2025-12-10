import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { ScheduleItem } from '../models/schedule.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  private pb = new PocketBase('http://127.0.0.1:8090');

  constructor(private router: Router) {}

  async login (ra: string, password: string){
    try {
      const auth = await this.pb.collection('users').authWithPassword(ra, password);
      console.log('Usuário logado:', auth);
      this.router.navigate(['/dashboard']);
      return auth;
    } catch (err: any) {
      console.error('Erro ao logar:', err);
      throw err;
    }
  }

  logout() {
    this.pb.authStore.clear();
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.pb.authStore.isValid;
  }

// converte nomes PT-BR → keys do filtro
  readonly DAY_MAP: Record<string, string> = {
    'segunda': 'monday',
    'terça': 'tuesday',
    'terca': 'tuesday',
    'quarta': 'wednesday',
    'quinta': 'thursday',
    'sexta': 'friday',
    'sábado': 'saturday',
    'sabado': 'saturday',
    'domingo': 'sunday',
  };

  async getSchedules(): Promise<ScheduleItem[]> {
    const result = await this.pb.collection('schedules').getList(1, 500);

    return result.items.map((item: any) => {
      const rawDays = item.class_days.toLowerCase().split(' e ');

      return {
        id: Number(item.id),
        subject: item.name,
        period: item.period,
        hours: item.class_hours,
        days: item.class_days,

        dayKeys: rawDays
          .map((d: string) => this.DAY_MAP[d.trim()] ?? null)
          .filter(Boolean) as string[],

        selected: false
      };
    });
  }


}
