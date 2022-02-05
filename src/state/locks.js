import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'locks',
  initialState: {},
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },

    acquire: (state, { payload: { user, criterion, client_id } }) => {
      state[`${user}:${criterion}`] = client_id;
    },

    release: (state, { payload: { user, criterion } }) => {
      delete state[`${user}:${criterion}`];
    }
  }
});

export default slice;
