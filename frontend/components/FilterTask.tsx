"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';
import { User, UserState } from '@/redux/userSlice';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'completed' | 'in-progress';
  createdAt: string;
}

interface TasksProps {
  filteredTasks: any;
}

const FilterTask: React.FC<TasksProps> = ({ filteredTasks }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const userDetails = useSelector((state: any) => state.user.user);
  const [popupTask, setPopupTask] = useState<Task | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      console.log( "email:", userDetails )
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_ROUTE}/task/one/${userDetails?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true
          }
        );
        setTasks(response.data);
      } catch (error) {
        toast('Failed to load tasks. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleCompleteTask = async (_Id: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.NEXT_PUBLIC_ROUTE}/task/update/${_Id}`,
        { status: 'completed' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true
        }
      );

      setTasks(
        tasks.map((task) =>
          task._id === _Id ? { ...task, status: 'completed' } : task
        )
      );

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

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const handleTaskClick = (task: Task, event: React.MouseEvent) => {
    setPopupTask(task);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setPopupTask(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const tasksToRender: Task[] = Array.isArray(filteredTasks) && filteredTasks.length > 0
  ? filteredTasks
  : Array.isArray(tasks)
    ? tasks
    : []

  return (
    <div className="container mx-auto p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Tasks</h1>
        <Link href="/dashboard/addtask">
          <Button className="bg-blue-600 text-white">Create New Task</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : tasksToRender.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You don't have any tasks yet</p>
          <Link href="/dashboard/addtask">
            <Button className="bg-blue-600 text-white">Create Your First Task</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {tasksToRender.map((task:any) => (
            <div key={task._id} className="relative">
              <Card onClick={(e) => handleTaskClick(task, e)}>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-medium text-lg mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {task.description}
                  </p>
                  <div className="text-xs text-gray-500">
                    <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                    <p>
                      Created: {formatDistanceToNow(new Date(task.createdAt))} ago
                    </p>
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
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Button
                    onClick={() => {
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
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterTask;