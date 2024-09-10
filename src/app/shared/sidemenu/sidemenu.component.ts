import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-sidemenu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('800ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SidemenuComponent {
  constructor(private router: Router) {}
  onLogout() {
    localStorage.clear();
    sessionStorage.clear();

   this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
        window.location.reload();
    });

  }
}
