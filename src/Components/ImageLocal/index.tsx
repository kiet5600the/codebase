import React from 'react'
import FastImage from 'react-native-fast-image'
import Images from '@/Theme/Images'
import { styles } from './styles'
import { LocalImageProps } from './type'

export const ImageLocal = ({
  source,
  style: styleOverride,
  resizeMode = 'cover',
  children = null,
}: LocalImageProps) => {
  // render
  return (
    <FastImage
      style={[styles.img, styleOverride]}
      resizeMode={resizeMode}
      source={Images[source ?? 'default']}
    >
      {children ?? null}
    </FastImage>
  )
}
