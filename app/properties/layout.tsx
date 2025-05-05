import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Properties | ilkevim',
  description: 'Browse our selection of premium properties in the UK.',
}

export default function PropertiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 