import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, FileText, File } from 'lucide-react'
import { saveAs } from 'file-saver'
import html2pdf from 'html2pdf.js'
import { useCV } from '../context/CVContext'

function ExportButtons() {
  const { t } = useTranslation()
  const { cv } = useCV()
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById('cv-preview')
      
      // Add page break styles temporarily
      const style = document.createElement('style')
      style.textContent = `
        @media print {
          .cv-preview {
            page-break-inside: avoid;
          }
          .cv-preview section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .cv-preview h1, .cv-preview h2, .cv-preview h3 {
            page-break-after: avoid;
            break-after: avoid;
          }
          .cv-preview > div {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          .cv-preview .dynamic-item {
            page-break-inside: avoid;
            break-inside: avoid;
            margin-bottom: 0.5rem;
          }
        }
      `
      document.head.appendChild(style)
      
      const options = {
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: `${cv.personalInfo.fullName || 'CV'}.pdf`,
        image: { 
          type: 'jpeg', 
          quality: 0.98 
        },
        html2canvas: { 
          scale: 2, 
          useCORS: true,
          letterRendering: true,
          allowTaint: false,
          backgroundColor: '#ffffff'
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait'
        },
        pagebreak: {
          mode: ['avoid-all', 'css', 'legacy'],
          before: '.page-break-before',
          after: '.page-break-after',
          avoid: '.page-break-avoid'
        }
      }
      
      await html2pdf().set(options).from(element).save()
      
      // Remove temporary styles
      document.head.removeChild(style)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    }
    setIsExporting(false)
  }

  const exportToHTML = () => {
    const element = document.getElementById('cv-preview')
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cv.personalInfo.fullName || 'CV'}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .cv-preview { max-width: 800px; margin: 0 auto; }
        </style>
      </head>
      <body>
        <div class="cv-preview">
          ${element.innerHTML}
        </div>
      </body>
      </html>
    `
    
    const blob = new Blob([htmlContent], { type: 'text/html' })
    saveAs(blob, `${cv.personalInfo.fullName || 'CV'}.html`)
  }

  const exportToJSON = () => {
    const jsonData = JSON.stringify(cv, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    saveAs(blob, `${cv.personalInfo.fullName || 'CV'}.json`)
  }

  return (
    <div className="export-buttons">
      <button 
        className="btn btn-primary" 
        onClick={exportToPDF}
        disabled={isExporting}
      >
        <Download size={16} />
        {isExporting ? t('buttons.exporting') : t('buttons.exportPDF')}
      </button>
      
      <button 
        className="btn btn-secondary" 
        onClick={exportToHTML}
      >
        <FileText size={16} />
        {t('buttons.exportHTML')}
      </button>
      
      <button 
        className="btn btn-secondary" 
        onClick={exportToJSON}
      >
        <File size={16} />
        {t('buttons.saveData')}
      </button>
    </div>
  )
}

export default ExportButtons
