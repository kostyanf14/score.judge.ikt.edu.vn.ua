import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'locks',
  initialState: {},
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },

    acquire: (state, { payload: { lock, client_id } }) => {
      state[lock] = client_id;
    },

    release: (state, { payload: { lock } }) => {
      delete state[lock];
    }
  }
});

export default slice;
