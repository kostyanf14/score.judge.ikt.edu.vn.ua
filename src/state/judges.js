import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'judges',
  initialState: [],
  reducers: {
    load: (_state, { payload }) => {
      return payload;
    },
  }
});

export default slice;
