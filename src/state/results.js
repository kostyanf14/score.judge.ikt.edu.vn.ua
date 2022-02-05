import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const setResult = (state, user, criterion, result) => {
  if (state[user])
    state[user][criterion] = result;
  else
    state[user] = { [criterion]: result };
};

const getResult = (state, user, criterion) => state[user]?.[criterion];

const slice = createSlice({
  name: 'results',
  initialState: {},
  reducers: {
    load: (state, { payload }) => {
      for (const { user, criterion, value } of payload)
        setResult(state, user, criterion, { value });
    },

    reset: (state, { payload: { user, criterion, value } }) => {
      setResult(state, user, criterion, { value });
    },

    dirtyUpdate: (state, { payload: { user, criterion, value } }) => {
      const dirty = uuidv4();
      setResult(state, user, criterion, { value, dirty });
    },

    cleanUpdate: (state, { payload: { token, user, criterion, value } }) => {
      const result = getResult(state, user, criterion);
      if (!result || !result.dirty || result.dirty === token)
        setResult(state, user, criterion, { value });
    },
  }
});

export default slice;
