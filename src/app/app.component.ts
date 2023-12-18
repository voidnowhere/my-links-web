import {Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, PrimeIcons} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MenubarModule, InputTextModule, NgOptimizedImage],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {label: 'Home', icon: PrimeIcons.HOME, routerLink: 'home',},
      {label: 'My links', icon: PrimeIcons.LINK, routerLink: 'links'},
    ];
  }
}
