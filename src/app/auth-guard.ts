import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { PocketbaseService } from './services/pocketbase.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(PocketbaseService);
  const router = inject(Router);

  // se nao estiver logado → redireciona para login
  if (!auth.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true; // se estiver aí ermite entrar na rota
};
