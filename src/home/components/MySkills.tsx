import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'

export const MySkills = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <section id="skills" className="relative z-20 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-4xl font-bold gradient-text">{copy.recruiter.skillsTitle}</h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {copy.recruiter.skills.map(([title, description]) => (
            <div key={title} className="rounded-lg bg-gray-900 p-6 text-center backdrop-blur-xl">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
