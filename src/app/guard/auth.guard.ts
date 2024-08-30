import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const user = userService.getUserFromLocalStorage();

  if (user) {
    // If user is logged in, redirect to the home page
    router.navigate(['/']);
    return false;
  }

  // If user is not logged in, allow access to the route
  return true;
};
