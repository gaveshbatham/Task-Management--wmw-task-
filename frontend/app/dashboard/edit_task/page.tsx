"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; 
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { User, UserState } from "@/redux/userSlice";

const editTask = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    assignedTo: "",
    assignedBy: ""
  });
  const email = localStorage.getItems('email')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      assignedTo: email,
      assignedBy: email
    });
    
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ROUTE}/task/add`, 
        formData,
        {headers: 
          {
          Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      
      toast("Your task has been edited successfully.",);
      
      router.push('/dashboard/');
    } catch (error) {
      toast("Failed to edit task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit your Task</h2>
            <Link href="/dashboard/tasks">
              <Button variant="outline">Go to tasks</Button>
            </Link>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleChange}
                required 
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                rows={4} 
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input 
                type="date" 
                id="dueDate" 
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required 
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Edit task"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default editTask;