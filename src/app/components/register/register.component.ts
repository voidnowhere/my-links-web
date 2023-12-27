import {Component} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    NgIf,
    ReactiveFormsModule,
    ToastModule
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  userForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.authService.register({
        email: this.userForm.value.email,
        password: this.userForm.value.password,
      }).subscribe({
        next: (value: any) => {
          this.userForm.reset();
          this.messageService.add({severity: 'success', detail: 'Registered succefully'});
          this.router.navigate(['login']);
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
