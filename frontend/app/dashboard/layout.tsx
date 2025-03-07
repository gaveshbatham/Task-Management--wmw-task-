import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div>
        <Navbar text={<Button className="ml-4 bg-blue-600 text-white">Logout</Button>} />
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            {children}
        </div>
    </div>
    );
  }