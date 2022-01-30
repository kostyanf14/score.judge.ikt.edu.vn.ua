import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'errors',
  initialState: null,
  reducers: {
    push: (_, { payload }) => {
      toast.error(payload);
    },
  }
});

export default slice;
