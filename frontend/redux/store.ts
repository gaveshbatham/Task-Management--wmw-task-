import { configureStore } from '@reduxjs/toolkit';
import  userSlice  from './userSlice';
import  taskSlice  from './taskSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    task: taskSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
