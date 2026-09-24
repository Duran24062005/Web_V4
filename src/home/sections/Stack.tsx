import type { Language } from '../../i18n/config'
import { BrandIcon } from '../../shared/components/BrandIcon'
import type { HomeContent } from '../home.content'
import { stackGroups, type StackGroup } from '../stack.data'
import { SectionHeader } from './SectionHeader'

interface StackProps {
  content: HomeContent
  language: Language
  index: number
}

// Two balanced columns on wide screens: 7 + 3 + 2 rows | 9 + 3 rows.
const columns: StackGroup['layer'][][] = [
  ['frontend', 'data', 'systems'],
  ['backend', 'devops'],
]

const showLevels = stackGroups.some((group) => group.items.some((item) => item.level))

const StackTable = ({ group, content, language }: { group: StackGroup; content: HomeContent; language: Language }) => (
  <table className="spec-table" data-reveal>
    <caption>
      <span className="spec-caption">
        <span className="spec-code mono">{group.code}</span>
        <span>{content.stack.layers[group.layer]}</span>
        <span className="spec-count mono">{String(group.items.length).padStart(2, '0')}</span>
      </span>
    </caption>
    <thead className="sr-only">
      <tr>
        <th scope="col">{content.stack.columns.technology}</th>
        <th scope="col">{content.stack.columns.usage}</th>
        {showLevels ? <th scope="col">Level</th> : null}
      </tr>
    </thead>
    <tbody>
      {group.items.map((item, index) => (
        <tr key={item.name}>
          <th scope="row">
            <BrandIcon icon={item.icon} glyph={item.glyph} size={18} className="spec-icon" />
            <span>{item.name}</span>
          </th>
          <td>
            <span>{item.usage[language]}</span>
            <span className="spec-ref mono" aria-hidden="true">
              {group.code}.{String(index + 1).padStart(2, '0')}
            </span>
          </td>
          {showLevels ? <td className="mono">{item.level ?? '—'}</td> : null}
        </tr>
      ))}
    </tbody>
  </table>
)

export const Stack = ({ content, language, index }: StackProps) => (
  <section id="skills" className="section" aria-labelledby="skills-title" tabIndex={-1}>
    <div className="wrap">
      <SectionHeader
        id="skills"
        index={index}
        code={`${content.sections.skills.code} / SPEC`}
        title={content.stack.title}
        description={content.stack.description}
      />
      <div className="grid-12 stack-grid">
        {columns.map((layers) => (
          <div key={layers.join()} className="stack-column">
            {layers.map((layer) => {
              const group = stackGroups.find((candidate) => candidate.layer === layer)
              return group ? <StackTable key={layer} group={group} content={content} language={language} /> : null
            })}
          </div>
        ))}
      </div>
    </div>
  </section>
)
