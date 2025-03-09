import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePhoto: string;
}

const initialState: UserState = {
  _id: '',
  name: '',
  email: '',
  password: '',
  profilePhoto: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const { _id, name, email, password, profilePhoto } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.password = password;
      state.profilePhoto = profilePhoto;
    },

    clearUser(state) {
      state._id = '';
      state.name = '';
      state.email = '';
      state.password = '';
      state.profilePhoto = '';
    },

    updateUserDetails(state, action: PayloadAction<Partial<UserState>>) {
      Object.assign(state, action.payload);
    },
  },
});

export const { setUser, clearUser, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
