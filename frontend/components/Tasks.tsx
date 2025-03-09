"use client" 
import axios from 'axios'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegStar } from 'react-icons/fa'

const Tasks = async() => {

    // const tasks = await axios.get(`${process.env.NEXT_PUBLIC_ROUTE}/task/one/${user.email}`)

    const tasks:string[] = ["pending work", "make a coffee"] 

  return (
            <ul className="mt-4 space-y-2">
                  {tasks.map((task, index) => (
                    <div key={index} className="bg-white p-3 shadow rounded-md flex justify-between items-center">
                      <div>
                        {task}
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