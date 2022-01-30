import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import app from './app';
import criteria from './criteria';
import users from './users';
import errors from './errors';

const store = configureStore({
  reducer: combineReducers({
    app: app.reducer,
    criteria: criteria.reducer,
    users: users.reducer,
    errors: errors.reducer,
  })
});

export default store;
