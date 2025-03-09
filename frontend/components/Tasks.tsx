"use client" 
import { getTasks } from '@/hooks/getTask'
import { addTask } from '@/redux/taskSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegStar } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

const Tasks = () => {
    useEffect(() => {
      getTasks()
    },[]) 
    const tasks = useSelector((state:any) => state.task.tasks)

  return (
            <ul className="mt-4 space-y-2">
                  {tasks.map((task:any, index:number) => (
                    <div key={index} className="bg-white p-3 shadow rounded-md flex justify-between items-center">
                      <div>
                        {task.title}
                      </div>
                      <div className="flex gap-3">
                        <FaRegStar />
                        {/* <FaStar /> */}
                        <BsThreeDotsVertical />
                      </div>  
                    </div>
                  ))}
            </ul>
  )
}

export default Tasks