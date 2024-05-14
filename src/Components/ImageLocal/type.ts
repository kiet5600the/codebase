import { StyleProp, ViewStyle } from 'react-native'
import { ImageStyle } from 'react-native-fast-image'
import Images from '@/Theme/Images'

export type ImageTypes = keyof typeof Images

type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center'

export interface LocalImageProps {
  /**
   * Overwrite image style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>

  /**
   * Overwrite wrap image style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>

  /**
   * Source image(local)
   * @default undefined
   */
  source: ImageTypes

  /**
   * Custom resizeMode
   * @default contain
   */
  resizeMode?: ResizeMode
  children?: React.ReactNode
}
