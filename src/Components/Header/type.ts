import { StyleProp, ViewStyle, TextStyle } from 'react-native'

export interface HeaderProps {
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  hideGoback?: boolean
  title: string
  rightIcon?: string
  onBackIconPress?: () => {}
  onRightIconPress?: () => {}
}
