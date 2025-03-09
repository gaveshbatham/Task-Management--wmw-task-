import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
    _id: number;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed"; 
    dueDate: string; 
    assignedBy: string;
}

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: []
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<{ index: number; updatedTask: Task }>) => {
            const { index, updatedTask } = action.payload;
            if (index >= 0 && index < state.tasks.length) {
                state.tasks[index] = updatedTask;
            }
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((_, i) => i !== action.payload);  // _id
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        }
    }
});

export const { addTask, updateTask, removeTask, setTasks } = taskSlice.actions;
export default taskSlice.reducer;
