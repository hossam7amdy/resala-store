import { Container, Skeleton, StatusBadge, Text } from '@medusajs/ui'
import { Link, useSearchParams } from 'react-router-dom'
import { useStoreLanguages } from '../../../hooks/api'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Container className="h-max w-[400px] space-y-3">{children}</Container>
}

const Loading = () => {
  return (
    <Wrapper>
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-full" />
    </Wrapper>
  )
}

const Empty = () => {
  return (
    <Wrapper>
      <Text>No translations available</Text>
      <Text size="large" weight="plus">
        <Link to="/settings/languages" className="text-ui-fg-interactive">
          Add language
        </Link>
      </Text>
    </Wrapper>
  )
}

export const ActiveLanguageSummary: React.FC = () => {
  const [searchParams] = useSearchParams()
  const languageCode = searchParams.get('language')
  const { storeLanguages = [], isLoading } = useStoreLanguages({
    code: languageCode || undefined,
    is_default: !languageCode,
  })

  if (isLoading) {
    return <Loading />
  }

  if (storeLanguages?.length === 0) {
    return <Empty />
  }

  const storeLanguage = storeLanguages.at(0)!
  return (
    <Wrapper>
      <div className="inline-flex gap-2">
        <Text>{storeLanguage?.name}</Text>
        {storeLanguage.is_default && (
          <StatusBadge color="grey">Default</StatusBadge>
        )}
        <StatusBadge color={storeLanguage.is_published ? 'green' : 'grey'}>
          {storeLanguage.is_published ? 'Published' : 'Not published'}
        </StatusBadge>
      </div>
      <div>
        {storeLanguage.is_published ? (
          <Text>Translations are visible to customers</Text>
        ) : (
          <Text>
            Translations are not visible to customers until the language is
            published
          </Text>
        )}
      </div>
      <Text weight="plus">
        <Link to="/settings/languages" className="text-ui-fg-interactive">
          Manage
        </Link>
      </Text>
    </Wrapper>
  )
}
