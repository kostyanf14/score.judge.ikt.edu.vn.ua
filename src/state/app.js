import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    isReady: false,
    contest_name: '',
    task_name: '',
  },
  reducers: {
    start: (state) => { state.isReady = false },
    ready: (state, { payload }) => {
      state.contest_name = payload.contest_name;
      state.task_name = payload.task_name;
      state.isReady = true;
    },
  }
});

export default slice;
