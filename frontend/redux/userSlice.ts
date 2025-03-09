import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// User interface
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  profilePhoto?: string;
  verified: boolean;
}

interface UserState {
  user: User | null; // Null means no user is logged in/selected
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Set the current user (e.g., after login)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    // Clear the current user (e.g., logout)
    clearUser: (state) => {
      state.user = null;
    },

    // Update fields of the current user
    updateUserDetails: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        Object.assign(state.user, action.payload);
      }
    },
  },
});

export const { setUser, clearUser, updateUserDetails } = userSlice.actions;

export default userSlice.reducer;
