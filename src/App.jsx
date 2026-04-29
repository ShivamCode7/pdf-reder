import React from 'react'
import { Routes, Route } from 'react-router'
import Home from './routes/Home'
import TopHeader from './components/TopHeader'

function App() {
  return (
    <main>
      <TopHeader />
      <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
    </main>
  )
}

export default App