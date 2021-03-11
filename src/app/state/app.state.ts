import { ProductState } from '../products/state/product.reducer';

// defining state for entire app
export interface State {
  products: ProductState;
  user: any;
}
