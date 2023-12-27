import {Component} from '@angular/core';
import {InputTextModule} from "primeng/inputtext";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.login({
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      }).subscribe({
        next: (value: any) => {
          this.userForm.reset();
          localStorage.setItem('token', value.token);
          this.authService.loggedIn.set(true);
          this.router.navigate(['links']);
        },
        error: err => {
          this.messageService.add({severity: 'error', detail: 'Invalid email or password'});
          this.password.reset();
        }
      });
    }
  }

  get email() {
    return this.userForm.get("email")!;
  }

  get password() {
    return this.userForm.get("password")!;
  }
}
