import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const permittedKinds = ['info', 'success', 'warn', 'error'];

const slice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    push: (_, { payload: { kind, message } }) => {
      if (!permittedKinds.includes(kind))
        return

      toast[kind](message);
    },
  }
});

export default slice;
