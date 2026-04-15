import { useLanguage } from '../../i18n/LanguageContext'
import { getCopy } from '../../i18n/copy'

export const MySperience = () => {
  const { language } = useLanguage()
  const copy = getCopy(language)

  return (
    <section id="experiencia" className="relative z-20 py-20">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-4xl font-bold gradient-text">{copy.recruiter.experienceTitle}</h2>
        <div className="space-y-12">
          {copy.recruiter.experience.map((job) => (
            <div key={`${job.company}-${job.period}`} className="rounded-lg bg-gray-800 p-6">
              <h3 className="mb-2 text-2xl font-bold">{job.title}</h3>
              <p className="mb-4 text-purple-400">
                {job.company} | {job.period}
              </p>
              <ul className="list-inside list-disc space-y-2">
                {job.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
