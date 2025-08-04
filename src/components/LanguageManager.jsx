import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const LanguageManager = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    // Update HTML lang attribute when language changes
    document.documentElement.lang = i18n.language
    
    // Update page title based on language
    const titles = {
      sv: 'CV Builder - Skapa Professionellt CV Online | Prima Nordic Solution',
      en: 'CV Builder - Create Professional Resume Online | Prima Nordic Solution'
    }
    
    document.title = titles[i18n.language] || titles.sv
    
    // Update meta description
    const descriptions = {
      sv: 'Skapa ett professionellt CV online med vår moderna CV Builder. Gratis verktyg för att bygga CV på svenska och engelska. Utvecklad av Mikael Mykha på Prima Nordic Solution.',
      en: 'Create a professional resume online with our modern CV Builder. Free tool for building CVs in Swedish and English. Developed by Mikael Mykha at Prima Nordic Solution.'
    }
    
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', descriptions[i18n.language] || descriptions.sv)
    }
    
    // Force a re-render of CSS by toggling a class
    document.body.classList.remove('lang-sv', 'lang-en')
    document.body.classList.add(`lang-${i18n.language}`)
    
  }, [i18n.language])

  return null // This component doesn't render anything
}

export default LanguageManager
