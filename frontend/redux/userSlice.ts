import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  verified: boolean;
}

export interface UserState {
  user: User| null;
}

const initialState: UserState = {
  user: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload
        };
      }
    },

    // clearUser: (state) => {
    //   state.user = ;
    // },
  },
});

export const { setUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
