import { Component } from '@angular/core';
import { BasketState } from '../../shared/states/basket-state';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nbProducts$!: Observable<number>;

  constructor(private store: Store) {
    this.nbProducts$ = this.store.select(BasketState.getNbProducts);
  }
}
