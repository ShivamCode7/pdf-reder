import React from 'react'
import { CiCircleQuestion } from 'react-icons/ci'
import { FiUser } from 'react-icons/fi'
import { IoIosNotificationsOutline } from 'react-icons/io'
import { IoSearchOutline } from 'react-icons/io5'
import { MdOutlineMenu } from 'react-icons/md'
import { Link } from 'react-router'

function TopHeader() {
    return (
        <header className='bg-gray-800 flex justify-between items-center'>
            <div className='flex items-center w-full'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <button aria-label='Open menu'><MdOutlineMenu /></button>
                        <div>Self Talk Management</div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="text" placeholder='Search...' aria-label='Search' />
                        <button aria-label='Search'><IoSearchOutline /></button>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <li><Link to='/Catalog'>Catalog</Link></li>
                    <li>Select Campus <span></span></li>
                    <li><Link to='/contact'>Dr. B Ramesh</Link></li>
                </div>

            </div>

            <div className='flex items-center gap-2'>
                <button aria-label='Help'><CiCircleQuestion /></button>
                <button aria-label='Help'><CiCircleQuestion /></button>
                <button aria-label='Help'><CiCircleQuestion /></button>
                <button aria-label='Help'><CiCircleQuestion /></button>
                <button aria-label='Help'><IoIosNotificationsOutline /></button>
                <button aria-label='Help'><FiUser /></button>
            </div>
        </header>
    )
}

export default TopHeader