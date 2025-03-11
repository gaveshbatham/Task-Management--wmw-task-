"use client"
import { Task } from '@/components/Tasks';
import { Button } from '@/components/ui/button';
import { sortTasks } from '@/redux/taskSlice';
import { UserState } from '@/redux/userSlice';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import axios from 'axios';
import  { useRef } from 'react';
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa'
import { FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';

const page = () => {
  const dispatch = useDispatch()
  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value as "Due" | "Created" | "Completed" | "Incomplete";
    dispatch(sortTasks(selectedValue));
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const user = useSelector((state: UserState) => state.user)
  const [loading, setLoading] = useState(true);
  const [popupTask, setPopupTask] = useState<Task | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleCompleteTask = async (_Id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${process.env.NEXT_PUBLIC_ROUTE}/task/update/${_Id}`,
        { status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      setTasks(tasks.map((task) =>
        task._id === _Id
          ? { ...task, status: 'completed' }
          : task
      ));

      toast('Task marked as completed successfully.');
    } catch (error) {
      toast('Failed to complete task. Please try again.');
    }
  };

  const handleDeleteTask = async (_Id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${process.env.NEXT_PUBLIC_ROUTE}/task/delete/${_Id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      setTasks(tasks.filter((task) => task._id !== _Id));
      toast('Task deleted successfully.');
    } catch (error) {
      toast('Failed to delete task. Please try again.');
    }
  };

    const handleTaskClick = (task: Task, event: React.MouseEvent) => {
    setPopupTask(task);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ROUTE}/task/one/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true
          }
        );
        const resp = response.data;
        setTasks(resp.filter(resp.assignedBy !== user?.email))
      } catch (error) {
        toast('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    fetchTasks()
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setPopupTask(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  },[toast, user?.email])

    const getStatusColor = (status: Task['status']) => {
      switch (status) {
        case 'completed': return 'bg-green-100 text-green-800';
        case 'in-progress': return 'bg-red-100 text-red-800';
        default: return 'bg-blue-100 text-blue-800';
      }
    };

        return ( <main className="flex-1 p-10 max-w-[77.5rem]">
                    <h1 className="text-3xl font-semibold"><FiUser className='inline mr-2 relative top-[-0.3rem]'/>Assigned to me</h1>
                    <div className="mt-5 flex items-center space-x-2">
                      <input 
                        type="text" 
                        placeholder="Search your task" 
                        className="flex-1 p-2 border rounded-md" 
                      />
                      <button  className="p-3 h-11 w-11 bg-blue-500 text-white rounded-md hover:bg-blue-700">
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
            
                    <ul className="mt-4 space-y-2">
                    {loading ? (
                          <div className="flex justify-center py-10">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                          </div>
                        ) : (
                          tasks.map((task) => (
                            <div key={task._id} className="relative">
                              <Card onClick={(e) => handleTaskClick(task, e)}>
                                <CardContent className="p-6">
                                  <div className="mb-2">
                                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                                    </span>
                                  </div>
                                  <h3 className="font-medium text-lg mb-2">{task.title}</h3>
                                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{task.description}</p>
                                  <div className="text-xs text-gray-500">
                                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                                    <p>Created: {formatDistanceToNow(new Date(task.createdAt))} ago</p>
                                  </div>
                                </CardContent>
                                <CardFooter className="bg-gray-50 p-4 flex justify-between">
                                  {task.status !== 'completed' && (
                                    <Button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCompleteTask(task._id);
                                      }}
                                      variant="outline"
                                      size="sm"
                                    >
                                      Mark Complete
                                    </Button>
                                  )}
                                </CardFooter>
                              </Card>
                
                              {popupTask && popupTask._id === task._id && (
                                <div
                                  ref={popupRef}
                                  className="absolute bg-white border rounded shadow-md p-4 z-10"
                                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                                >
                                  <Button
                                    onClick={() => {
                                      // Implement edit task logic here
                                      toast('Edit task functionality goes here');
                                    }}
                                    variant="ghost"
                                    size="sm"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => handleDeleteTask(task._id)}
                                    variant="destructive"
                                    size="sm"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))
                        )
                      }    
                    </ul>
                </main>
        )        
}

export default page
