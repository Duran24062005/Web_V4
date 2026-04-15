import { useLanguage } from '../i18n/LanguageContext'
import { getCopy } from '../i18n/copy'

export const Index = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <div className="pt-6 text-white">
      <h1 className="japonesa my-2 flex justify-center text-4xl text-white">{copy.recruiter.dashboard.title}</h1>
      <section className="japonesa flex justify-center gap-6 px-6 text-gray-400">
        {copy.recruiter.dashboard.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </div>
  )
}
