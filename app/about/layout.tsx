import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | ilkevim',
  description: 'Learn more about ilkevim and our commitment to premium real estate.',
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 