import { FaSearch } from 'react-icons/fa'
import { FiUser } from "react-icons/fi";

const page = () => {
    
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
                      <select name='filter' className='border rounded-md p-2 text-lg'>
                        <option value="Sort by" disabled defaultValue="Sort by">Sort by</option>
                        <option value="Due">Due date</option>
                        <option value="Created">Created date</option>
                        <option value="Completed">Completed</option>
                        <option value="Incomplete">Incomplete</option>
                      </select>
                    </div>
            
                    <ul className="mt-4 space-y-2">
                      {/* {tasks.map((task, index) => (
                        <li key={index} className="bg-white p-3 shadow rounded-md">{task}</li>
                      ))} */}
                    </ul>
                </main>
        )        
}

export default page
