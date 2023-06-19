import { ReactNode } from 'react'
import { Text } from 'react-native'
import clsx from 'clsx'

interface PriceHighlightProps {
  variant: 'income' | 'outcome'
  children: ReactNode
}

export function PriceHighlight({ children, variant }: PriceHighlightProps) {
  return (
    <Text
      className={clsx('font-title', {
        'text-green-300': variant === 'income',
        'text-red-300': variant === 'outcome'
      })}
    >
      {children}
    </Text>
  )
}
