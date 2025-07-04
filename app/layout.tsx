import './globals.css'
import type { Metadata } from 'next'
import { Providers } from '@/providers/Providers'

export const metadata: Metadata = {
  title: 'Storyverse',
  description: 'AI-powered storytelling platform',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
