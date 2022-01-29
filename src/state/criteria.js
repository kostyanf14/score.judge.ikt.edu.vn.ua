import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'criteria',
  initialState: [],
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },

    add: (state, { payload }) => {
      state.push(payload);
    },

    update: (state, { payload }) => {
      Object.assign(state.find(c => c.id === payload.id), payload);
    },

    delete: (state, { payload }) => {
      return state.filter(c => c.id !== payload);
    },

    dragDrop: (state, { payload: { from, to } }) => {
      const criterion = state[from];
      state.splice(from, 1);
      state.splice(to, 0, criterion);
    }
  }
});

export default slice;
