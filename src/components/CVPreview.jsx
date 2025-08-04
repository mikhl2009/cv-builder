import React from 'react'
import { useCV } from '../context/CVContext'
import ModernTemplate from '../templates/ModernTemplate'
import ClassicTemplate from '../templates/ClassicTemplate'
import MinimalTemplate from '../templates/MinimalTemplate'

const templates = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate
}

function CVPreview() {
  const { cv } = useCV()
  const TemplateComponent = templates[cv.template] || ModernTemplate

  return (
    <div id="cv-preview" className="cv-preview">
      <TemplateComponent cv={cv} />
    </div>
  )
}

export default CVPreview
