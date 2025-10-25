import React, { useEffect } from 'react'
import { Select } from '@medusajs/ui'
import { useSearchParams } from 'react-router-dom'

import { useStoreLocales } from '../../../../../hooks/api'

export const LocaleSelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { storeLocales = [] } = useStoreLocales({
    is_default: false,
  })

  const handleLocaleChange = (locale: string) => {
    setSearchParams((prev) => {
      prev.set('locale', locale)
      return prev
    })
  }

  useEffect(() => {
    const currentLocale = searchParams.get('locale')
    if (!currentLocale && storeLocales.length > 0) {
      handleLocaleChange(storeLocales[0].code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, storeLocales])

  return (
    <div className="w-[200px]">
      <Select
        value={searchParams.get('locale') || undefined}
        onValueChange={handleLocaleChange}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select language" />
        </Select.Trigger>
        <Select.Content>
          {storeLocales?.map((storeLocale) => (
            <Select.Item key={storeLocale.id} value={storeLocale.code}>
              {storeLocale.name} ({storeLocale.code})
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}
