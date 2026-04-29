import React from 'react'
import ToolBar from '../components/ToolBar'
import FileBar from '../components/FileBar'
import InvoiceCanvas from '../components/InvoiceCanvas'
import BottomRightTools from '../components/BottomRightTools'
import SideBarThumbnails from '../components/SideBarThumbnails'

function Home() {
  return (
    <div className='flex flex-col h-full'>
      <FileBar />
      <ToolBar />
      <div className='flex h-full gap-4'>
        <SideBarThumbnails />
        <InvoiceCanvas />
        <BottomRightTools />
      </div>
    </div>

  )
}

export default Home