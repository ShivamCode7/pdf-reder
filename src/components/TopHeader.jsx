import React from 'react'

import { CiCircleQuestion } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import { MdOutlineKeyboardArrowDown, MdOutlineMenu } from 'react-icons/md'
import { Link } from 'react-router'

function TopHeader() {
    return (
        <header className="bg-gray-900 flex items-center justify-between">

            {/* Left Section */}
            <div className="flex items-center gap-6 w-full">

                {/* Logo + Menu */}
                <div className="flex items-center gap-3 shrink-0">
                    <button
                        aria-label="Open menu"
                        className="w-12 h-12 text-white flex items-center justify-center hover:bg-gray-800 rounded-md text-2xl cursor-pointer"
                    >
                        <MdOutlineMenu />
                    </button>

                    <h1 className="text-white font-semibold whitespace-nowrap">
                        Self Talk Management
                    </h1>
                </div>

                {/* Search Box */}
                <div className="relative max-w-md w-full hidden md:block">
                    <input
                        type="text"
                        placeholder="Search..."
                        aria-label="Search"
                        className="w-full h-12 bg-[#2B2B2B] text-white pl-4 pr-10 outline-none border border-gray-700"
                    />

                    <button
                        aria-label="Search"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
                    >
                        <IoSearchOutline />
                    </button>
                </div>

                {/* Nav Links */}
                <ul className="hidden lg:flex items-center gap-10 text-white text-sm ml-4 whitespace-nowrap">
                    <li>
                        <Link to="/Catalog" className="hover:text-gray-300">
                            Catalog
                        </Link>
                    </li>

                    <li className="cursor-pointer hover:text-gray-300 flex items-center gap-1">
                        Select Campus
                        <span className='text-xl'><MdOutlineKeyboardArrowDown /></span>
                    </li>

                    <li>
                        <Link to="/contact" className="hover:text-gray-300">
                            Dr. B Ramesh
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Right Section */}
            <div className="flex items-center text-white ml-4">

                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 text-xl cursor-pointer">
                    <CiCircleQuestion />
                </button>

                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 text-xl cursor-pointer">
                    <CiCircleQuestion />
                </button>

                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 text-xl cursor-pointer">
                    <CiCircleQuestion />
                </button>

                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 text-xl cursor-pointer">
                    <CiCircleQuestion />
                </button>

                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 text-xl cursor-pointer">
                    <IoIosNotificationsOutline />
                </button>

                <button className="w-12 h-12 flex items-center justify-center hover:bg-gray-800 text-xl cursor-pointer">
                    <FiUser />
                </button>
            </div>

        </header>
    )
}

export default TopHeader