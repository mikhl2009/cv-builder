import React from 'react'
import { CVProvider } from './context/CVContext'
import Header from './components/Header'
import CVBuilder from './components/CVBuilder'
import Footer from './components/Footer'
import LanguageManager from './components/LanguageManager'
import './App.css'

function App() {
  return (
    <CVProvider>
      <LanguageManager />
      <div className="app">
        <Header />
        <CVBuilder />
        <Footer />
      </div>
    </CVProvider>
  )
}

export default App
