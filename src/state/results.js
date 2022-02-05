import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const slice = createSlice({
  name: 'results',
  initialState: {},
  reducers: {
    load: (state, { payload }) => {
      for (const { user, criterion, value } of payload)
        state[`${user}:${criterion}`] = { value };
    },

    reset: (state, { payload: { user, criterion, value } }) => {
      setResult(state, user, criterion, { value });
    },

    dirtyUpdate: (state, { payload: { user, criterion, value } }) => {
      const dirty = uuidv4();
      state[`${user}:${criterion}`] = { value, dirty };
    },

    cleanUpdate: (state, { payload: { token, user, criterion, value } }) => {
      const key = `${user}:${criterion}`;
      const result = state[key];
      if (!result || !result.dirty || result.dirty === token) {
        state[key] = { value };
      }
    },
  }
});

export default slice;
