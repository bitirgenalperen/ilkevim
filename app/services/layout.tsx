import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services | ilkevim',
  description: 'Explore our premium real estate services in the UK.',
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 