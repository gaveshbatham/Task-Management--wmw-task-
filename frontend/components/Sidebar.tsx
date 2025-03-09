"use client"
import React, { useState } from 'react'
import { FiStar, FiUser, FiHome } from "react-icons/fi";
import { SidebarItem } from './SidebarItem';
import Link from 'next/link';

const Sidebar = () => {

  const [activeItem, setActiveItem] = useState("Tasks");

  const handleSidebarClick = (label: string) => {
    setActiveItem(label);
  };  //fix this

  return (
    <aside className="w-68 bg-white p-5 shadow-md border">
        <nav className="space-y-2">
          <Link href="/dashboard/profile"><SidebarItem icon={<div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">HP</div>} label={<span className="text-gray-700 font-semibold">User</span>} active={activeItem === ""} onClick={handleSidebarClick} /></Link>
          <div className='pl-8'>
            <Link href="/dashboard"><SidebarItem icon={<FiHome />} label="Tasks" active={activeItem === "Tasks"} onClick={handleSidebarClick} /></Link>
            <Link href="/dashboard/Important"><SidebarItem icon={<FiStar />} label="Important" active={activeItem === "Important"} onClick={handleSidebarClick} /></Link>
            <Link href="/dashboard/assigned"><SidebarItem icon={<FiUser />} label="Assigned to me" active={activeItem === "Assigned to me"} onClick={handleSidebarClick} /></Link>
          </div>
        </nav>
      </aside>
  )
}

export default Sidebar