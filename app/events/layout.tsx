import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Upcoming Events | ilkevim',
  description: 'Stay updated with our latest real estate events and open houses.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 