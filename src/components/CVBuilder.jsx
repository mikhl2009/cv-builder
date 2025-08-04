import React, { useState } from 'react'
import { useCV } from '../context/CVContext'
import CVEditor from './CVEditor'
import CVPreview from './CVPreview'
import TemplateSelector from './TemplateSelector'
import ExportButtons from './ExportButtons'

function CVBuilder() {
  const { cv } = useCV()
  const [activeTab, setActiveTab] = useState('personal')

  return (
    <main className="cv-builder">
      <div className="sidebar">
        <div className="action-buttons">
          <ExportButtons />
        </div>
        
        <TemplateSelector />
        
        <CVEditor activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <div className="preview">
        <CVPreview />
      </div>
    </main>
  )
}

export default CVBuilder
