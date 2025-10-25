import { Container, Skeleton, StatusBadge, Text } from '@medusajs/ui'
import { useStoreLocales } from '../../../hooks/api'
import { Link, useSearchParams } from 'react-router-dom'

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

export const ActiveLocaleSummary: React.FC = () => {
  const [searchParams] = useSearchParams()
  const localeCode = searchParams.get('locale')
  const { storeLocales = [], isLoading } = useStoreLocales({
    code: localeCode || undefined,
    is_default: !localeCode,
  })

  if (isLoading) {
    return <Loading />
  }

  if (storeLocales?.length === 0) {
    return <Empty />
  }

  const storeLocale = storeLocales.at(0)!
  return (
    <Wrapper>
      <div className="inline-flex gap-2">
        <Text>{storeLocale?.name}</Text>
        {storeLocale.is_default && (
          <StatusBadge color="grey">Default</StatusBadge>
        )}
        <StatusBadge color={storeLocale.is_published ? 'green' : 'grey'}>
          {storeLocale.is_published ? 'Published' : 'Not published'}
        </StatusBadge>
      </div>
      <div>
        {storeLocale.is_published ? (
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
