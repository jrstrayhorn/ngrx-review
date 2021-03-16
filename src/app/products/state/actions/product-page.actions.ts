import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const toggleProductCode = createAction(
  '[Product Page] Toggle Product Code'
);

export const setCurrentProduct = createAction(
  '[Product Page] Set Current Product',
  props<{ currentProductId: number }>() // define structure and type of data
);

export const clearCurrentProduct = createAction(
  '[Product Page] Clear Current Product'
);

export const initializeCurrentProduct = createAction(
  '[Product Page] Initialize Current Product'
);

// Load Actions
// for complex operations like http call we need at least 3 actions
// Load/Init, Success, Failure
export const loadProducts = createAction('[Product Page] Load'); // kick off action

// Update Product
export const updateProduct = createAction(
  '[Product Page] Update Product',
  props<{ product: Product }>()
);
