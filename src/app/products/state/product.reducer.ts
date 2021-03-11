import { createAction, createReducer, on } from '@ngrx/store';
import { Product } from '../product';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

// reducer defines our initial state
export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toggle Product Code'), (state) => {
    return {
      ...state,
      showProductCode: !state.showProductCode,
    };
  })
);
