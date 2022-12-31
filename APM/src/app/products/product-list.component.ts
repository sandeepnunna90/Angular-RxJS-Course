import { Component, ChangeDetectionStrategy } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';

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
  selectedCategoryId = 1

  // products$: Observable<Product[]> | undefined;
  //async pipe benefits
  // - no need to subscribe
  // - no need to unsubscribe
  // - imporves change detection

  products$ = this.productService.productsWithCategory$
    .pipe(
      catchError(err => {
        this.errorMessage = err;
        return EMPTY; // or return of([])
      })
    );

  productsSimpleFilter$ = this.productService.productsWithCategory$
    .pipe(
      map(products =>
        products.filter(product =>
          this.selectedCategoryId ? product.categoryId === this.selectedCategoryId : true
        )
      )
    )

  constructor(private productService: ProductService) { }


  onAdd(): void {
    console.log('Not yet implemented');
  }

  onSelected(categoryId: string): void {
    console.log('Not yet implemented');
  }
}
