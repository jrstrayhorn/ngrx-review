// defining state for entire app
// if using state from eagerly loaded feature module

import { UserState } from '../user/state/user.reducer';

// define here
// strongly type state
// 1 - strongly type the user state
export interface State {
  user: UserState;
}
