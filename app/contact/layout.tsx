import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get In Touch | ilkevim',
  description: 'Get in touch with our real estate experts.',
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 