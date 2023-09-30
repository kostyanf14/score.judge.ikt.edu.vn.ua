import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'resultMultiplier',
  initialState: '1',
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },
  },
});

export default slice;
