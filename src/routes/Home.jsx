import React from 'react'
import ToolBar from '../components/ToolBar'
import FileBar from '../components/FileBar'
import InvoiceCanvas from '../components/InvoiceCanvas'
import BottomRightTools from '../components/BottomRightTools'
import SideBarThumbnails from '../components/SideBarThumbnails'

function Home() {
  return (
    <div>
      <FileBar />
      <ToolBar />
      <div className='flex'>
        <BottomRightTools />
        <InvoiceCanvas />
        <SideBarThumbnails />
      </div>
    </div>

  )
}

export default Home