"use client" 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState('Student')

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* <Navbar /> */}
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
            <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-12">
              <label className={`px-4 py-2 cursor-pointer ${selected === 'Student' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                <input
                  type="radio"
                  name="toggle"
                //   value={input.role === 'Student'}
                  checked={selected === 'Student'}
                  onChange={() => setSelected('Student')}
                  className="hidden"
                />
                Student
              </label>
              <label className={`px-4 py-2 cursor-pointer ${selected === 'Recruiter' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}>
                <input
                  type="radio"
                  name="toggle"
                //   value={input.role === 'Recruiter'}
                //   checked={selected === 'Recruiter'}
                  onChange={() => setSelected('Recruiter')}
                  className="hidden"
                />
                Recruiter
              </label>
            </div>
          <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <form className="space-y-4">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Your name here" required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="Example@gmail.com" required />
              </div>
              <div>
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password here"
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>
              <div>
                <Label>Profile</Label>
                <Input type="file" />
              </div>
              <Button className="w-full" type="submit">
                Signup
              </Button>
            </form>
            <div className="text-center mt-4">
              <Button variant="outline" className="w-full">
                Continue with Google
              </Button>
            </div>
            <p className="text-center text-sm mt-4">
              Already have an account? <a href="#" className="text-blue-500">Login</a>
            </p>
          </div>
        </div>
    </div>
  );
}
