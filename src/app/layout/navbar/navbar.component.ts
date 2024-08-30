import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { ButtonComponent } from '../../button/button.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faRightFromBracket,
  faRightToBracket,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { User } from '../../../types';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentRoute: string = '';
  private routeSub: Subscription;
  private userSub: Subscription | null = null;

  faUserPlus = faUserPlus;
  faRightToBracket = faRightToBracket;
  faRightFromBracket = faRightFromBracket;

  user: User | null = null;

  constructor(private router: Router, private userService: UserService) {
    this.routeSub = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute = this.router.url;
      });
  }

  ngOnInit(): void {
    this.userSub = this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });
  }

  onLogout() {
    this.userService.removeUser();
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
