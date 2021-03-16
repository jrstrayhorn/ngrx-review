import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';

import { ProductState } from './product.reducer';

// if defining state from a lazy loaded feature module
// define in this way.. extending the app.state
export interface State extends AppState.State {
  products: ProductState;
}

// will get whole slice of state for product feature
// can only be used inside this code file no export
// order of these consts are important
const getProductFeatureState = createFeatureSelector<ProductState>('products');

// selectors to be used anywhere in the app thus export
export const getShowProductCode = createSelector(
  getProductFeatureState,
  (state) => state.showProductCode
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

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (
    state,
    currentProductId // getting properties from list of composed selectors
  ) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'New',
        description: '',
        starRating: 0,
      };
    } else {
      return currentProductId
        ? state.products.find((p) => p.id === currentProductId)
        : null;
    }
  }
);

export const getError = createSelector(
  getProductFeatureState,
  (state) => state.error
);

// should create a selector for each bit of state you have
// then compose them together based on what you need for
// component
// this helps with encapsulating the state allows easier changes
// to store/state over time
