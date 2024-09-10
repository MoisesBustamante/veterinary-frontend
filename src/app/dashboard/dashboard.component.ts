import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SidemenuComponent } from '../shared/sidemenu/sidemenu.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ RouterModule, SidemenuComponent, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 100 }),
        animate('8000ms', style({ opacity: 5 }))
      ])
    ])
  ]
})
export  default class DashboardComponent {
 
}
