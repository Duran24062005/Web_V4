import { Facebook, Github, Instagram, Linkedin } from 'lucide-react'
import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'
import { contactData } from '../../home/home.content'

export const Footer = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <footer className="relative bottom-0 left-0 z-40 w-full bg-gray-900 py-2">
      <div className="conatiner mx-auto justify-center px-6">
        <div className="flex flex-col md:w-[60vh] md:flex-row lg:justify-between">
          <div className="mt-4 flex justify-center space-x-4">
            <p className="text-[0.2vh] md:text-sm">
              {copy.footer.copyrightPrefix} &copy; {new Date().getFullYear()}{' '}
              <span className="Alexi md:text-lg">Alexi Dg</span>.
            </p>
          </div>
          <div className="mt-4 flex justify-center space-x-4">
            <a href={contactData.facebook} className="text-gray-400 hover:text-blue-600">
              <Facebook />
            </a>
            <a href={contactData.github} className="text-gray-400 hover:text-white">
              <Github />
            </a>
            <a href={contactData.instagram} className="text-gray-400 hover:text-pink-600">
              <Instagram />
            </a>
            <a href={contactData.linkedin} className="text-gray-400 hover:text-blue-600">
              <Linkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
