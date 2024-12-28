import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import ErrorBoundary from '@/components/error-boundary'
import './globals.css'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gurunath Gorule - Software Engineer',
  description: 'Portfolio of Gurunath Gorule, a software engineer specializing in building exceptional digital experiences.',
  keywords: ['Software Engineer', 'Web Development', 'DevOps', 'Machine Learning'],
  authors: [{ name: 'Gurunath Gorule' }],
  openGraph: {
    title: 'Gurunath Gorule - Software Engineer',
    description: 'Portfolio of Gurunath Gorule, a software engineer specializing in building exceptional digital experiences.',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Gurunath Gorule Portfolio',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gurunath Gorule - Software Engineer',
    description: 'Portfolio of Gurunath Gorule, a software engineer specializing in building exceptional digital experiences.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
  icons: {
    icon: '/favicon.svg',
  },
  metadataBase: new URL('https://example.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}

