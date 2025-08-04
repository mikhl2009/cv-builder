import React from 'react'
import { CVProvider } from './context/CVContext'
import Header from './components/Header'
import CVBuilder from './components/CVBuilder'
import './App.css'

function App() {
  return (
    <CVProvider>
      <div className="app">
        <Header />
        <CVBuilder />
      </div>
    </CVProvider>
  )
}

export default App
