import React, { useEffect } from 'react'
import { Select } from '@medusajs/ui'
import { useSearchParams } from 'react-router-dom'
import { useStoreLanguages } from '../../../../../hooks/api'

export const LanguageSelector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { storeLanguages = [] } = useStoreLanguages({
    is_default: false,
  })

  const handleLanguageChange = (language: string) => {
    setSearchParams((prev) => {
      prev.set('language', language)
      return prev
    })
  }

  useEffect(() => {
    const currentLanguage = searchParams.get('language')
    if (!currentLanguage && storeLanguages.length > 0) {
      handleLanguageChange(storeLanguages[0].code)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, storeLanguages])

  return (
    <div className="w-[200px]">
      <Select
        value={searchParams.get('language') || undefined}
        onValueChange={handleLanguageChange}
      >
        <Select.Trigger>
          <Select.Value placeholder="Select language" />
        </Select.Trigger>
        <Select.Content>
          {storeLanguages?.map((storeLanguage) => (
            <Select.Item key={storeLanguage.id} value={storeLanguage.code}>
              {storeLanguage.name} ({storeLanguage.code})
            </Select.Item>
          ))}
        </Select.Content>
      </Select>
    </div>
  )
}
