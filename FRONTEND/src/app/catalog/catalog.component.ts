import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { Product } from '../../shared/models/product';
import { SearchProductComponent } from '../search-product/search-product.component';
import { AddProduct } from '../../shared/actions/product-action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    CommonModule,
    SearchProductComponent,
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  products$!: Observable<Product[]>
  filteredProducts$!: Observable<Product[]>;

  constructor(private apiService: ApiService, private store: Store) { }

  ngOnInit(): void {
    this.products$ = this.apiService.getCatalog();
    this.filteredProducts$ = this.products$;
  }

  onSearch(criteria: { query: string, minPrice: number | null, maxPrice: number | null }) {
    this.filteredProducts$ = this.products$.pipe(
      map(products => products.filter(product => {
        const matchesQuery = product.name?.toLowerCase().includes(criteria.query.toLowerCase()) ||
                             product.description?.toLowerCase().includes(criteria.query.toLowerCase());
        const matchesMinPrice = criteria.minPrice === null || (product.price !== undefined && product.price >= criteria.minPrice);
        const matchesMaxPrice = criteria.maxPrice === null || (product.price !== undefined && product.price <= criteria.maxPrice);
        return matchesQuery && matchesMinPrice && matchesMaxPrice;
      }))
    );
  }

  addToBasket(product: Product) {
    console.log('Ajout du produit au panier', product);
    this.store.dispatch(new AddProduct(product));
  }
}
