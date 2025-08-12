import React from 'react'

const RichTextDisplay = ({ content, style = {} }) => {
  if (!content) return null
  
  // Clean and sanitize the HTML content
  const cleanHTML = content
    .replace(/<p><\/p>/g, '') // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '') // Remove paragraphs with only whitespace
    .trim()
  
  if (!cleanHTML) return null
  
  return (
    <div 
      style={{
        lineHeight: '1.6',
        ...style
      }}
      dangerouslySetInnerHTML={{ __html: cleanHTML }}
    />
  )
}

export default RichTextDisplay
