import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const slice = createSlice({
  name: 'comments',
  initialState: {},
  reducers: {
    load: (state, { payload }) => {
      for (const { user, value } of payload)
        state[user] = { value };
    },

    reset: (state, { payload: { user, value } }) => {
      state[user] = { value };
    },

    dirtyUpdate: (state, { payload: { user, value } }) => {
      const dirty = uuidv4();
      state[user] = { value, dirty };
    },

    cleanUpdate: (state, { payload: { token, user, value } }) => {
      const comment = state[user];
      if (!comment || !comment.dirty || comment.dirty === token)
        state[user] = { value };
    },
  }
});

export default slice;
