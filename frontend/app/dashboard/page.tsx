import { Main } from '@/components/Main'
import Navbar from '@/components/Navbar'
import  Sidebar  from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import React from 'react'

const page = async() => {
  // const response = await fetch(('http://localhost:5000/task/add'),{
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(),
  // })
  return (
    <div className='w-[100%] bg-gray-100'>
      <Main />
    </div>
  )
}

export default page