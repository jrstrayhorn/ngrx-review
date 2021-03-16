import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Product } from '../product';
import {
  getCurrentProduct,
  getError,
  getProducts,
  getShowProductCode,
  State,
} from '../state';

import { ProductPageActions } from '../state/actions';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  // errorMessage: string;

  // no longer need these local properties b/c of store observables below
  // displayCode: boolean;

  // products: Product[];

  // // Used to highlight the selected product in the list
  // selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;

  // importing state from product.reducer instead of app.state
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(ProductPageActions.loadProducts());
    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => (this.products = products),
    //   error: (err) => (this.errorMessage = err),
    // });
    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   (currentProduct) => (this.selectedProduct = currentProduct)
    // );
    this.selectedProduct$ = this.store.select(getCurrentProduct);

    // since product state is initially defined in reducer
    // no need to check if exists
    this.displayCode$ = this.store.select(getShowProductCode);
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    this.store.dispatch(ProductPageActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductPageActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(
      ProductPageActions.setCurrentProduct({ currentProductId: product.id })
    );
  }
}
