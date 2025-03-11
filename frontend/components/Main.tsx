"use client";
import { FaSearch, } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { sortTasks } from "@/redux/taskSlice";
import { useState } from "react";
import FilterTask from "./FilterTask";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: Date;
  createdAt: Date
}

interface RootState {
  tasks: {
    tasks: Task[];
  };
}

interface TasksProps {
  filteredTasks: any;
}

export const Main = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const tasks = useSelector((state: RootState) => state.tasks?.tasks);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value as "Due" | "Created" | "Completed" | "Incomplete";
    dispatch(sortTasks(selectedValue));
  }

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTasks(filtered);
  };

  return (
    <main className="flex-1 p-10 py-4 max-w-[77.5rem]">
      <h1 className="text-3xl font-semibold">My Day</h1>
      <p className="text-gray-500">10/03/25</p>

      <div className="bg-white p-6 mt-5 shadow-md rounded-lg text-center">
        <h2 className="text-lg font-semibold">Focus on your day</h2>
        <p className="text-gray-500">Get things done with Clone-do.</p>
      </div>

      <div className="mt-5 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search your task"
          className="flex-1 p-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="p-3 h-11 w-11 bg-blue-500 text-white rounded-md hover:bg-blue-700" onClick={handleSearch}>
          <FaSearch />
        </button>
        <select name='filter' className='border rounded-md p-2 text-lg' onChange={handleSortChange}>
          <option value="Sort by" disabled defaultValue="Sort by">Sort by</option>
          <option value="Due">Due date</option>
          <option value="Created">Created date</option>
          <option value="Completed">Completed</option>
          <option value="Incomplete">Incomplete</option>
        </select>
      </div>
      <FilterTask filteredTasks={filteredTasks} />
    </main>
  );
};