"use client"
import React, { useState } from 'react'
import { FiUser, FiHome } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { UserState } from '@/redux/userSlice';

const Sidebar = () => {

  const [activeItem, setActiveItem] = useState("Tasks");
  const user = useSelector((state:UserState) => state.user)

  const handleSidebarClick = (label: string) => {
    setActiveItem(label);
  };

  return (
    <aside className="w-68 bg-white p-5 shadow-md border">
        <nav className="space-y-2">
          <Link href="/dashboard/profile"><SidebarItem icon={<div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">{user?.name?.substring(0, 2).toUpperCase() || 'WMW'}</div>} label={<span className="text-gray-700 font-semibold">{user?.name}</span>} active={activeItem === ""} onClick={handleSidebarClick} /></Link>
          {/* {user?.role == "admin"?  */}
          <div className='pl-8'>
            <Link href="/dashboard"><SidebarItem icon={<FiHome />} label="Tasks" active={activeItem === "Tasks"} onClick={handleSidebarClick} /></Link>
            <Link href="/dashboard/assigned"><SidebarItem icon={<MdAssignmentInd />} label="Assigned to me" active={activeItem === "Assigned to me"} onClick={handleSidebarClick} /></Link>
            <Link href="/dashboard/users"><SidebarItem icon={<FiUser />} label="Users" active={activeItem === "Users"} onClick={handleSidebarClick} /></Link>
          </div>
          {/* : */}
          {/* <div className='pl-8'>
            <Link href="/dashboard"><SidebarItem icon={<FiHome />} label="Tasks" active={activeItem === "Tasks"} onClick={handleSidebarClick} /></Link>
            <Link href="/dashboard/assigned"><SidebarItem icon={<MdAssignmentInd />} label="Assigned to me" active={activeItem === "Assigned to me"} onClick={handleSidebarClick} /></Link>
          </div> */}
          {/* } */}
        </nav>
      </aside>
  )
}

export default Sidebar