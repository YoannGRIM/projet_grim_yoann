import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Store } from '@ngxs/store';
import { ResestBasket } from '../shared/actions/product-action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FRONTEND';

  constructor(public authService: AuthService, private router: Router, private store: Store) { }

  onLogout(): void {
    this.authService.logout();
    this.store.dispatch(new ResestBasket());
    this.router.navigate(['/']);
  }
}
