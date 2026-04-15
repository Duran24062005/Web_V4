import { useEffect } from 'react'
import { Github, Instagram, Linkedin } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getNavBarItems } from '../mock/data/navBarItems'
import { Footer } from '../shared/components/Footer'
import { NavBar } from '../shared/components/NavBar'
import { useAuthSession } from '../shared/hooks/useAuthSession'
import { useLanguage } from '../i18n/LanguageContext'
import { getCopy } from '../i18n/copy'
import { buildLocalizedPath } from '../i18n/utils'

export const PrivateZona = () => {
  const { token, user } = useAuthSession()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const copy = getCopy(language)

  useEffect(() => {
    if (!token) {
      navigate(buildLocalizedPath(language, '/recruiter'))
    }
  }, [language, navigate, token])

  return (
    <div className="h-screen">
      <NavBar items={getNavBarItems(language)} />
      <main className="flex justify-center">
        <div className="container">
          <div className="mt-8 flex-col">
            <h1 className="flex justify-center text-4xl">
              {copy.recruiter.privateZone.greeting}!{' '}
              <span className="japonesa text-3xl">
                {user.firstName} {user.lastName}
              </span>
            </h1>
            <hr className="mt-2 border-violet-500" />
            <p className="mt-2 flex justify-center text-lg">{copy.recruiter.privateZone.welcome}</p>
          </div>
          <section className="my-8 flex-col justify-center">
            <h2 className="my-4 flex justify-center text-2xl">{copy.recruiter.privateZone.cv}</h2>
            <div className="flex justify-center">
              <img
                src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/AlexiDuranGomez%20Tecnolog%C3%ADa%20Curr%C3%ADculum.png"
                alt="CV"
              />
            </div>
          </section>
          <section className="my-8 flex-col justify-center">
            <h2 className="my-4 flex justify-center text-2xl">{copy.recruiter.privateZone.contact}</h2>
            <div className="flex justify-center">
              <ul>
                <li>
                  <span className="font-bold">{copy.recruiter.privateZone.cell}:</span> 3216123545
                </li>
                <li>
                  <span className="font-bold">{copy.common.email}:</span> alexisdurangomez588@gmail.com
                </li>
                <li>
                  <span className="font-bold">GitHub:</span> Duran24062005
                </li>
                <div className="my-4 flex justify-center gap-4">
                  <a href="https://github.com/Duran24062005" className="text-gray-400 hover:text-white">
                    <Github />
                  </a>
                  <a href="https://www.instagram.com/alexis_duran_dg/" className="text-gray-400 hover:text-pink-600">
                    <Instagram />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alexi-duran-gomez-6b17042a3/"
                    className="text-gray-400 hover:text-blue-600"
                  >
                    <Linkedin />
                  </a>
                </div>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
