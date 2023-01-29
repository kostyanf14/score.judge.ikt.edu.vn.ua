import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    isReady: false,
    readOnly: false,
    contest_name: '',
    task_name: '',
  },
  reducers: {
    start: (state) => { state.isReady = false },
    ready: (state, { payload }) => {
      state.readOnly = payload.read_only;
      state.contest_name = payload.contest_name;
      state.task_name = payload.task_name;
      state.isReady = true;
    },
    finish: (state) => {
      state.readOnly = true;
    }
  }
});

export default slice;
