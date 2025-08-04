'use client'

import { Button } from '@/components/ui/button'
import { useChangeLocale } from '@/locales/client'

export function Switch() {
  const changeLocale = useChangeLocale()

  return (
    <div className="flex flex-col gap-4 max-w-xs">
      <Button
        className="cursor-pointer"
        type="button"
        onClick={() => changeLocale('en')}
      >
        EN
      </Button>
      <Button
        className="cursor-pointer"
        type="button"
        onClick={() => changeLocale('vi')}
      >
        VI
      </Button>
    </div>
  )
}
