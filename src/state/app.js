import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    isReady: false,
  },
  reducers: {
    start: (state) => { state.isReady = false },
    ready: (state) => { state.isReady = true },
  }
});

export default slice;
