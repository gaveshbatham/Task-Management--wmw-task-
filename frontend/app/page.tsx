import Image from "next/image";
import { Button } from '@/components/ui/button';
import { redirect } from "next/navigation";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center text-center">
    <header className="w-full py-6 bg-white shadow-md flex justify-between px-10">
      <h1 className="text-3xl font-bold text-blue-600">Clone-do</h1>
      <div>
        <Button className="ml-4 bg-blue-600 text-white">Start Managing Your Tasks!</Button>
      </div>
    </header>
    <main className="flex items-center justify-center gap-20 px-10 bg-[#00000000]">
      <div className="flex flex-col items-center justify-center py-20 w-[40%]">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Capture, organize, and tackle your to-dos from anywhere.
          </h2>
          <p className="text-gray-600 mb-8">
            Be the owner of your time and work efficiently.
          </p>
        
          <div className="flex gap-4">
            <form action={async() => { 'use server'; await redirect('/login')}}><Button type="submit" variant="ghost" className="hover:bg-[#d3d0d0]">Login</Button></form>
            <form action={async() => { 'use server'; await redirect('/submit')}}><Button type="submit" className="bg-blue-600 text-white">Sign up – it's free!</Button></form>
          </div>
        </div>  
        <div className="mt-20 ml-10 shadow-none">
          <Image
            src="/profile.png"
            width={600}
            height={900}
            alt="Trello Mobile App"
            className="rounded-lg"
          />
        </div>
    </main>  
  </div>
  );
}
