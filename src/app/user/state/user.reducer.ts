import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { User } from '../user';

// strongly type state
// 1 - strongly type the user state
export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null,
};

// strongly type state
// 2 - build selectors for maskUserName and currentUser
const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  (state) => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  (state) => state.currentUser
);

// strongly type state
// 3 - modify reducer to use strongly typed state
export const userReducer = createReducer(
  initialState,
  on(createAction('[User] Mask User Name'), (state) => {
    return {
      ...state,
      maskUserName: !state.maskUserName,
    };
  })
);
