import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'

interface AboutMeProps {
  image?: string
  video?: string
}

export const AboutMe = ({ image, video }: AboutMeProps) => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <section id="about-me" className="relative z-20 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center md:flex-row">
          {image ? (
            <>
              <div className="mb-8 md:mb-0 md:w-1/2 lg:w-2/6">
                <img src={image} alt="Alexi Dg" className="mx-auto rounded-full border-4 border-purple-500 shadow-lg" />
              </div>
              <div className="md:w-1/2 md:pl-8">
                <h2 className="mb-8 text-center text-4xl font-bold gradient-text">{copy.recruiter.aboutTitle}</h2>
                {copy.recruiter.aboutUp.map((text) => (
                  <p key={text} className="mb-4">
                    {text}
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="mt-24 justify-center px-2 md:flex lg:flex">
        <div className="flex flex-col-reverse items-center gap-10 md:flex-row">
          <div className="w-full max-w-2xl px-2 md:w-1/1">
            <h2 className="mb-6 text-center text-3xl font-bold gradient-text md:text-left md:text-4xl">
              {language === 'es' ? 'Quiero contarte sobre esta web' : 'I want to tell you about this website'}
            </h2>
            {copy.recruiter.aboutDown.map((text) => (
              <p key={text} className="mb-4 text-sm md:text-base">
                {text}
              </p>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-end px-2 md:w-1/2">
          <video className="w-full max-w-lg rounded-xl border-4 border-purple-500 shadow-xl" controls>
            <source src={video} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
