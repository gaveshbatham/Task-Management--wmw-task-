import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:"task",
    initialState:{
        task:{}
    },
    reducers:{
        setTask:(state, action) => {
            state.task = action.payload;
        }
    }
});
export const {setTask} = taskSlice.actions;
export default taskSlice.reducer;