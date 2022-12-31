import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, EMPTY, map, Observable, of, startWith, Subject } from 'rxjs';

import { ProductCategory } from '../product-categories/product-category';
import { ProductCategoryService } from '../product-categories/product-category.service';

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

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  // products$: Observable<Product[]> | undefined;
  //async pipe benefits
  // - no need to subscribe
  // - no need to unsubscribe
  // - imporves change detection


  products$ = combineLatest([
    this.productService.productsWithAdd$, // Data stream -> emits array products
    this.categorySelectedAction$ // Action stream -> emits value of selectedCategoryId everytime user selects it.
    //  .pipe(
    //   startWith(0) // Need this as data is not displayed directly on page load
    //  )
  ]).pipe(
    map(([products, selectedCategoryId]) =>
      products.filter(
        product => selectedCategoryId ? product.categoryId === selectedCategoryId : true
      )
    ),
    catchError(err => {
      this.errorMessage = err;
      return EMPTY;
    })
  );

  categories$ = this.productCategoryService.productCategories$
      .pipe(
        catchError(err => {
          this.errorMessage = err;
          return EMPTY;
        })
      );


  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService
  ) {}


  onAdd(): void {
    this.productService.addProduct();
  }

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId)
  }
}
