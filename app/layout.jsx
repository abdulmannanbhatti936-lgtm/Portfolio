import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import BrandLogo from '../components/BrandLogo'
import dynamic from 'next/dynamic'
import GoogleAnalytics from '../components/GoogleAnalytics'
import ErrorBoundary from '../components/ErrorBoundary'
import Providers from '../components/Providers'

const Background3D = dynamic(() => import('../components/Background3D'), { ssr: false })
const ChatbotWidget = dynamic(() => import('../components/ChatbotWidget'), { ssr: false })
const ParticleField = dynamic(() => import('../components/ParticleField'), { ssr: false })

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-jakarta'
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio-two-black-48.vercel.app'
  ),
  title: 'Abdul Mannan Bhatti | Full Stack Developer',
  description: 'Full Stack Developer from Islamabad, Pakistan. Building modern web apps with PHP, React.js, MySQL.',
  keywords: ['Full Stack Developer', 'PHP', 'React.js', 'MySQL', 'Next.js', 'Web Developer', 'Islamabad', 'Pakistan'],
  authors: [{ name: 'Abdul Mannan Bhatti' }],
  creator: 'Abdul Mannan Bhatti',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://portfolio-two-black-48.vercel.app',
    title: 'Abdul Mannan Bhatti | Full Stack Developer',
    description: 'Full Stack Developer from Islamabad, Pakistan. Building modern web apps with PHP, React.js, MySQL.',
    siteName: 'Abdul Mannan Bhatti Portfolio',
    images: [
      {
        url: 'https://portfolio-two-black-48.vercel.app/images/My pfp.webp',
        width: 1200,
        height: 630,
        alt: 'Abdul Mannan Bhatti',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdul Mannan Bhatti | Full Stack Developer',
    description: 'Full Stack Developer from Islamabad, Pakistan. Building modern web apps with PHP, React.js, MySQL.',
    images: ['https://portfolio-two-black-48.vercel.app/images/My pfp.webp'],
    creator: '@abdulmannanbhatti',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // TODO: Add real Google Search Console verification code here
    // google: 'your-google-verification-code',
  },
}

import SmoothScroll from '../components/SmoothScroll'

export default function RootLayout({ children }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Abdul Mannan Bhatti',
    jobTitle: 'Full Stack Software Engineer',
    url: 'https://portfolio-two-black-48.vercel.app',
    email: 'abdulmannanbhatti936@gmail.com',
    telephone: '+92 301 2343633',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Islamabad',
      addressCountry: 'Pakistan',
    },
    knowsAbout: ['PHP', 'MySQL', 'React.js', 'Next.js', 'Web Development', 'Full Stack Development'],
    description: 'Full Stack Software Engineer from Islamabad, Pakistan specializing in building high-performance web applications.',
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} ${inter.variable} antialiased flex bg-background font-inter`}>
        <ErrorBoundary>
          <Providers>
            {process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics GA_ID={process.env.NEXT_PUBLIC_GA_ID} />}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-lg z-[9999] focus:outline-none focus:ring-2 focus:ring-white"
            >
              Skip to main content
            </a>
            <Background3D />
            <ParticleField />
            <BrandLogo />
            <ChatbotWidget />
            <Sidebar />
            <MobileNav />
            <main id="main-content" className="flex-1 w-full overflow-x-hidden" tabIndex={-1}>
              {children}
            </main>
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  )
}