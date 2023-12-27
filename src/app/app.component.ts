import {Component, effect} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Router, RouterOutlet} from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, MessageService, PrimeIcons} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {AuthService} from "./services/auth.service";
import {MenuModule} from "primeng/menu";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, InputTextModule, NgOptimizedImage, ButtonModule, MenuModule, ToastModule, ConfirmDialogModule,],
  templateUrl: './app.component.html',
  providers: [MessageService]
})
export class AppComponent {
  items: MenuItem[] | undefined;
  private _loggedIn: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    effect(() => {
      this.items = [
        {label: 'Home', icon: PrimeIcons.HOME, routerLink: 'home'},
        {label: 'My links', icon: PrimeIcons.LINK, routerLink: 'links', visible: this.authService.loggedIn()},
      ];
      this._loggedIn = this.authService.loggedIn();
    });
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
