import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'

export const AboutMe = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <section id="about-me" className="relative z-20 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center md:flex-row">
          <div className="mb-8 md:mb-0 md:w-1/2 lg:w-2/6">
            <img
              src="https://raw.githubusercontent.com/Duran24062005/Web_V4/refs/heads/main/public/image/image_e713f47e.png"
              alt="Alexi Dg"
              className="mx-auto rounded-full border-4 border-purple-500 shadow-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="mb-8 text-center text-4xl font-bold gradient-text">{copy.recruiter.aboutTitle}</h2>
            {copy.recruiter.aboutUp.map((paragraph) => (
              <p key={paragraph} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
