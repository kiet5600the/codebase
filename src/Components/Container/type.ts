import React from 'react'
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native'
import { Edge } from 'react-native-safe-area-context'

export interface ContainerProps {
  style?: StyleProp<ViewStyle>
  children?: React.ReactNode
  safeAreaBackground?: string | null
  edges?: Array<Edge>
}

export interface ScrollContainerProps extends ContainerProps {
  contentContainerStyle?: StyleProp<ScrollViewProps>
}
