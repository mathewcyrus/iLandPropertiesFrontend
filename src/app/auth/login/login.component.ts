import { Component } from '@angular/core';
import { BackgroundviewComponent } from '../../backgroundview/backgroundview.component';
import { InputComponent } from '../../input/input.component';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    BackgroundviewComponent,
    InputComponent,
    CommonModule,
    ButtonComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  faGoogle = faGoogle;
  faSpinner = faSpinner;
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = null;
      const { email, password } = this.loginForm.value;

      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.isLoading = false;
          const token = response.token;
          const userId = this.authService.getUserIdFromToken(token);

          this.userService.getUser(userId).subscribe({
            next: (user) => {
              this.userService.setUser(user);
              document.cookie = `token=${token};path=/;max-age=${
                60 * 60 * 24 * 7
              };SameSite=Lax`;
              this.router.navigate(['/']);
            },
            error: (error) => {
              console.error('Error fetching user details', error);
              this.errorMessage = 'Failed to fetch user details';
            },
          });
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Invalid email or password';
          console.error('Login error', error);
        },
      });
    }
  }
}
