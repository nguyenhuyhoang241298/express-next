'use client'

import { useI18n } from '@/locales/client'
import { Switch } from './switch'

const Page = () => {
  const t = useI18n()
  return (
    <div className="flex flex-col gap-4">
      <p>{t('hello')}</p>
      <Switch />
    </div>
  )
}

export default Page
