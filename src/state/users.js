import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },
  }
});

export default slice;
