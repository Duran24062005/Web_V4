import type { Language } from '../../i18n/config'
import { getCopy } from '../../i18n/copy'

export const getNavBarItems = (language: Language) => getCopy(language).navigation.legacy

export const getNavBarItemsHome = (language: Language) => getCopy(language).navigation.legacy.slice(0, 7)
