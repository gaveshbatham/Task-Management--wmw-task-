import Link from "next/link";
import { FaSearch, FaRegStar, FaStar } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import Tasks from "./Tasks";

export const Main =() =>{

    return ( <main className="flex-1 p-10 py-4 max-w-[77.5rem]">
                <h1 className="text-3xl font-semibold">My Day</h1>
                <p className="text-gray-500">Thursday, 6 March</p>
        
                <div className="bg-white p-6 mt-5 shadow-md rounded-lg text-center">
                  <h2 className="text-lg font-semibold">Focus on your day</h2>
                  <p className="text-gray-500">Get things done with Clone-do.</p>
                  <Link href="/dashboard/addtask"><button 
                    className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Add your first task
                  </button></Link>
                </div>
                
                <div className="mt-5 flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="Search your task" 
                    className="flex-1 p-2 border rounded-md" 
                  />
                  <button  className="p-3 h-11 w-11 bg-blue-500 text-white rounded-md hover:bg-blue-700">
                    <FaSearch />
                  </button>
                </div>
                <Tasks/>   
            </main>
    )        
}