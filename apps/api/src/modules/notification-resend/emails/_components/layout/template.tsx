import {
  Body,
  BodyProps,
  Head,
  Html,
  HtmlProps,
  Preview,
  Tailwind,
  pixelBasedPreset,
} from '@react-email/components'
import { clx } from '@medusajs/ui'

type EmailTemplateProps = HtmlProps &
  BodyProps & {
    title: string
    preview: string
  }

export const EmailTemplate = ({
  children,
  preview,
  title,
  lang,
  dir,
  className,
  ...props
}: EmailTemplateProps) => (
  <Html lang={lang} dir={dir} style={{ background: '#fff', color: '#000' }}>
    <Preview>{preview}</Preview>
    <Head>
      <title>{title}</title>
    </Head>
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              primary: '#016272',
            },
          },
        },
      }}
    >
      <Body
        className={clx(
          'max-w-2xl bg-white text-black font-sans my-auto mx-auto',
          className
        )}
        {...props}
      >
        {children}
      </Body>
    </Tailwind>
  </Html>
)

export default EmailTemplate
