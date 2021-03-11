import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import * as AppState from '../../state/app.state';

import { Product } from '../product';

// if defining state from a lazy loaded feature module
// define in this way.. extending the app.state
export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  currentProductId: number;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: [],
  currentProductId: 0,
};

// will get whole slice of state for product feature
// can only be used inside this code file no export
// order of these consts are important
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// selectors to be used anywhere in the app thus export
export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  (state) => state.currentProduct
);

export const getProducts = createSelector(
  getProductFeatureState,
  (state) => state.products
);

// example of composing selectors
export const getCurrentProductId = createSelector(
  getProductFeatureState,
  (state) => state.currentProductId
);

export const getCurrentProductById = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (
    state,
    currentProductId // getting properties from list of composed selectors
  ) => state.products.find((p) => p.id === currentProductId)
);

// should create a selector for each bit of state you have
// then compose them together based on what you need for
// component
// this helps with encapsulating the state allows easier changes
// to store/state over time

// reducer defines our initial state
export const productReducer = createReducer<ProductState>(
  initialState,
  on(
    createAction('[Product] Toggle Product Code'),
    (state): ProductState => {
      return {
        ...state,
        showProductCode: !state.showProductCode,
      };
    }
  )
);
