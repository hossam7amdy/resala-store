import { Toaster } from '@medusajs/ui'

export default async function AccountPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}
