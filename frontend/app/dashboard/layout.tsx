"use client"
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { handleLogout } from "./action";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const onLogoutClick = async () => {
      try {
        const result = await handleLogout(); // server action call
        if (result.success) {
          alert('Logged out successfully!'); // ✅ Browser alert
          // Optionally, redirect to login page:
          window.location.href = '/login';
        } else {
          toast('Logout failed!');
        }
      } catch (error) {
        console.error('Logout error:', error);
        toast('An error occurred during logout');
      }
    };
    return (
        <div className="h-screen">
          <Navbar text={<form onClick={onLogoutClick}><Button className="ml-4 bg-blue-600 text-white">Logout</Button></form>} />
          <div className="flex h-full bg-gray-100">
              <Sidebar />
              {children}
          </div>
        </div>
    );
  }