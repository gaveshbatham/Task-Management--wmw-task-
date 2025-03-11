import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const handleLogout = async() => {
      "use server"
      await localStorage.removeItem('token');
      redirect('/login');
    }
    return (
        <div className="h-screen">
          <Navbar text={<form action={handleLogout}><Button className="ml-4 bg-blue-600 text-white">Logout</Button></form>} />
          <div className="flex h-full bg-gray-100">
              <Sidebar />
              {children}
          </div>
        </div>
    );
  }