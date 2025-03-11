import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
    _id: number;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed"; 
    dueDate: string; 
    assignedBy: string;
    assignedTo: string;
    createdAt: string;
}

export interface TaskState {
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
            state.tasks = state.tasks.filter((task) => task._id !== action.payload)
        },
        setTask: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        sortTasks: (state, action: PayloadAction<"Due" | "Created" | "Completed" | "Incomplete">) => {
            const sortBy = action.payload;
        switch (sortBy) {
            case "Due":
              state.tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
              break;
            case "Created":
              if (state.tasks[0]?.createdAt) {
                state.tasks.sort((a, b) => new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime());
              }
              break;
            case "Completed":
              state.tasks = state.tasks.filter((task) => task.status === "completed");
              break;
            case "Incomplete":
              state.tasks = state.tasks.filter((task) => task.status !== "completed");
              break;
            default:
              break;
          }
    }
  }
})

export const { addTask, updateTask, removeTask, setTask, sortTasks } = taskSlice.actions;
export default taskSlice.reducer;
