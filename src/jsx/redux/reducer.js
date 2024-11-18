import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false, 
  wallet:{

  }
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
  },
});

export const { setLogin,setWallet } = loginSlice.actions;
export default loginSlice.reducer;
