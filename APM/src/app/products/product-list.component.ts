import { Component, ChangeDetectionStrategy } from '@angular/core';
import { catchError, EMPTY, Observable, of } from 'rxjs';

import { ProductCategory } from '../product-categories/product-category';

import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush //changes detection startegy is set as part of the componenet decortor
})
export class ProductListComponent {
  pageTitle = 'Product List';
  errorMessage = '';
  categories: ProductCategory[] = [];

  // products$: Observable<Product[]> | undefined;
  //async pipe benefits
  // - no need to subscribe
  // - no need to unsubscribe
  // - imporves change detection

  constructor(private productService: ProductService) { }

  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY; // or return of([])
      })
    );

  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
