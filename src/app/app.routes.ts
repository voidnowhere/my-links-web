import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'home', loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)},
  {
    path: 'links',
    loadComponent: () => import('./components/links-list/links-list.component').then(c => c.LinksListComponent)
  },
];
