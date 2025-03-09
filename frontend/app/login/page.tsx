"use client"; 
import { useState , useTransition } from "react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { loginUser } from "./actions";
import { toast } from "sonner";

export default function Login() {
  type Role = "admin" | "user";
  
  type InputState = {
    photo?: File,
    role?: Role
  };
  const [state, formAction] = useActionState(loginUser,{error:null,success:null});

  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState<Role>("user");
  const [input, setInput] = useState<InputState>({});

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input,[e.target.name] : e.target.value });
  };

  return (
    <div className=" flex flex-col gap-12 bg-[#f3f2f2] min-h-screen">
      <Navbar text={<Button className="ml-4 bg-blue-600 text-white">Go back</Button>}/>
        <div className="flex flex-col items-center justify-center max-w-7xl mx-auto my-auto">
          <div className="w-full min-w-sm max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <div className="relative font-bold text-3xl text-center mb-4">Login</div>
            <form className="space-y-4 flex flex-col items-center" action={formAction}>  
              <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-12 w-[9rem] self-center">
                {(["admin", "user"] as Role[]).map((role) => (
                  <label
                    key={role}
                    className={`px-4 py-2 cursor-pointer ${
                      selected === role ? "bg-blue-600 text-white" : "bg-white text-gray-600"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      checked={selected === role}
                      onChange={() => setSelected(role)}
                      className="hidden"
                    />
                    {role}
                  </label>
                ))}
              </div>
              <div className="w-[98%]">
                <Label>Email</Label>
                <Input type="email" placeholder="Example@gmail.com" name="email" onChange={changeEventHandler} />
              </div>
              <div className="w-[98%]">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password here"
                    name="password"
                    onChange={changeEventHandler}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>
              <Button className="w-full bg-blue-500" type="submit">
                Login
              </Button>
            </form>
            <div className="text-center mt-4">
              <Link href="/"><Button variant="outline" className="w-full">
                Cancel
              </Button></Link>
            </div>
            <p className="text-center text-sm mt-4">
              <Link href="#" className="text-blue-600">Forgot Password?</Link>
            </p>
          </div>
        </div>
    </div>
  );
}
