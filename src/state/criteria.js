import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const slice = createSlice({
  name: 'criteria',
  initialState: [],
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },

    loadPosition(state, { payload }) {
      for (const criterion of state)
        criterion.position = payload[criterion.id];
      state.sort((a, b) => a.position - b.position);
    },

    add: (state, { payload }) => {
      state.push(payload);
    },

    dirtyUpdate: (state, { payload }) => {
      const criterion = state.find(c => c.id === payload.id);
      Object.assign(criterion, payload);
      criterion.dirty = uuidv4();
    },

    cleanUpdate: (state, { payload: { id, token, value } }) => {
      const criterion = state.find(c => c.id === id);
      if (!criterion.dirty || criterion.dirty === token) {
        Object.assign(criterion, value);
        criterion.dirty = null;
      }
    },

    delete: (state, { payload }) => {
      return state.filter(c => c.id !== payload);
    },

    dragDrop: (state, { payload: { from, to } }) => {
      const criterion = state[from];
      state.splice(from, 1);
      state.splice(to, 0, criterion);
    },
  }
});

export default slice;
