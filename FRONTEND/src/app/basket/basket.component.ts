import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BasketState } from '../../shared/states/basket-state';
import { DelProduct } from '../../shared/actions/product-action';
import { Product } from '../../shared/models/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent {
  products$: Observable<Product[]>;

  constructor(private store: Store) {
    this.products$ = this.store.select(BasketState.products);
  }

  delProductFromBasket(product: Product) {
    this.store.dispatch(new DelProduct(product));
  }
}
