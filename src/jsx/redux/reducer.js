import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: false, 
  wallet:{

  },
  userTask:{

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
    setUserTask: (state, action) => {
      state.userTask = action.payload;
    },
  },
});

export const { setLogin,setWallet,setUserTask } = loginSlice.actions;
export default loginSlice.reducer;
