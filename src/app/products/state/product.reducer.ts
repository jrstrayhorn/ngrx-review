import { createReducer, on } from '@ngrx/store';
import { Product } from '../product';
import * as ProductActions from './product.actions';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: '',
};

// reducer defines our initial state
export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    ProductActions.toggleProductCode,
    (state): ProductState => {
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }
  ),
  on(
    ProductActions.setCurrentProduct,
    (state, action): ProductState => {
      return {
        ...state,
        currentProductId: action.currentProductId,
      };
    }
  ),
  on(
    ProductActions.initializeCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: 0,
      };
    }
  ),
  on(
    ProductActions.clearCurrentProduct,
    (state): ProductState => {
      return {
        ...state,
        currentProductId: null,
      };
    }
  ),
  on(
    ProductActions.loadProductsSuccess,
    (state, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }
  ),
  on(
    ProductActions.loadProductsFailure,
    (state, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error,
      };
    }
  ),
  on(
    ProductActions.updateProductSuccess,
    (state, action): ProductState => {
      const updatedProducts = state.products.map((item) =>
        action.product.id === item.id ? action.product : item
      );
      return {
        ...state,
        products: updatedProducts,
        currentProductId: action.product.id,
        error: '',
      };
    }
  ),
  on(
    ProductActions.updateProductFailure,
    (state, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }
  )
);
