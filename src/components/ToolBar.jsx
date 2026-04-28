import React from 'react'
import { FiFileText, FiRotateCcw, FiRotateCw } from 'react-icons/fi'
import { IoIosList } from 'react-icons/io'
import { MdOutlineSkipNext } from 'react-icons/md'
import { PiArrowArcRightLight } from 'react-icons/pi'

function ToolBar() {
  return (
    <div className='bg-[#F5F5F5] border-b border-[#E0E0E0]'>
            <div className='flex items-center gap-8'>
                <div className='flex items-center gap-2'>
                    <div className='border-r border-[#E0E0E0]'>
                        <button className='w-[80px] h-12 inline-flex items-center justify-center cursor-pointer' aria-label='file select'><FiFileText /></button>
                        <button className='w-[80px] h-12 inline-flex items-center justify-center cursor-pointer'><IoIosList /></button>
                    </div>
                    <div className='flex items-center'>
                        <button className='size-8 flex items-center justify-center cursor-pointer'><FiRotateCcw /></button>
                        <button className='size-8 flex items-center justify-center cursor-pointer'><FiRotateCw /></button>
                        <button className='size-8 flex items-center justify-center cursor-pointer'><PiArrowArcRightLight strokeWidth={3} /></button>
                    </div>
                </div>

                <div>
                    <button className='size-8 flex items-center justify-center cursor-pointer'><MdOutlineSkipNext /></button>
                </div>

            </div>
        </div>
  )
}

export default ToolBar