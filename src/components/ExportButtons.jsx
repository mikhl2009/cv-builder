import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Download, FileText, File } from 'lucide-react'
import { saveAs } from 'file-saver'
import html2pdf from 'html2pdf.js'
import { useCV } from '../context/CVContext'
import ATSCompatiblePDFGenerator from './ATSCompatiblePDFGenerator'

function ExportButtons() {
  const { t, i18n } = useTranslation()
  const { cv } = useCV()
  const [isExporting, setIsExporting] = useState(false)

  const exportToPDF = async () => {
    setIsExporting(true)
    try {
      const element = document.getElementById('cv-preview')
      
      // Store original styles for restoration
      const originalOverflow = element.style.overflow
      const originalHeight = element.style.height
      
      // Temporarily ensure full content is visible for capture
      element.style.overflow = 'visible'
      element.style.height = 'auto'
      
      // Add page break styles temporarily
      const style = document.createElement('style')
      style.textContent = `
        .cv-preview {
          overflow: visible !important;
          height: auto !important;
        }
        .avoid {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .cv-preview section {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .cv-preview h1, .cv-preview h2, .cv-preview h3 {
          page-break-after: avoid;
          break-after: avoid;
        }
        .cv-preview .experience-item,
        .cv-preview .education-item,
        .cv-preview .project-item,
        .cv-preview .certification-item {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 0.5rem;
        }
      `
      document.head.appendChild(style)
      
      const options = {
        margin: 0.5,
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
          mode: 'css',
          avoid: '.avoid'
        }
      }
      
      await html2pdf().set(options).from(element).save()
      
      // Restore original styles
      element.style.overflow = originalOverflow
      element.style.height = originalHeight
      
      // Remove temporary styles
      document.head.removeChild(style)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    }
    setIsExporting(false)
  }

  // NEW: ATS-Compatible PDF Export
  const exportToATSPDF = async () => {
    setIsExporting(true)
    try {
      const currentLanguage = i18n.language || 'sv'
      const pdfGenerator = new ATSCompatiblePDFGenerator(currentLanguage)
      const doc = pdfGenerator.generatePDF(cv)
      const filename = `${cv.personalInfo.fullName || 'CV'}_ATS.pdf`
      doc.save(filename)
    } catch (error) {
      console.error('Error exporting ATS PDF:', error)
      alert('Error exporting ATS-compatible PDF. Please try again.')
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
        {isExporting ? t('buttons.exporting') : t('buttons.exportPDFVisual')}
      </button>
      
      <button 
        className="btn btn-success" 
        onClick={exportToATSPDF}
        disabled={isExporting}
      >
        <FileText size={16} />
        {isExporting ? t('buttons.exportingATS') : t('buttons.exportATSPDF')}
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
