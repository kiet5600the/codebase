import { StyleProp, TextStyle, ViewStyle } from 'react-native'

export interface TabViewProps {
  style?: StyleProp<ViewStyle>
  data: Array<any>
  focusTextColor?: string
  blurTextColor?: string
  textStyle?: StyleProp<TextStyle>
  sliderStyle?: StyleProp<ViewStyle>
  mgHorizontal?: number
  onIndexChange: (index: number) => void
  currentIndex: number
}
