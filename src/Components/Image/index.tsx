import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import FastImage, { OnLoadEvent } from 'react-native-fast-image'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'

import { useSharedTransition } from '@/Common/Animated'

import { styles } from './styles'
import { ImageProps } from './type'
import {
  useAsyncState,
  useMounted,
  useStateWhenMounted,
} from '@/Common/Hooks/useCommon'

const ImageComponent = ({
  style: styleOverride = {},
  source,
  resizeMode = 'cover',
  containerStyle,
  bgColor,
  childrenError,
  childrenOnload,
  onLoad,
  onLoadStart,
  onError,
  ...rest
}: ImageProps) => {
  // state

  const [loadSucceeded, setLoadSucceeded] = useStateWhenMounted<boolean>(false)
  // const [loadThumbSucceeded, setLoadThumbSucceeded] = useState<boolean>(false)
  const [error, setError] = useStateWhenMounted<boolean>(false)
  const opacityImg = useSharedTransition(loadSucceeded)
  const opacityOnLoad = useSharedTransition(!loadSucceeded)

  // function
  const onLoadImageStart = () => {
    setError(false)
  }

  const onLoadImageSucceeded = (event: OnLoadEvent) => {
    setTimeout(() => {
      setError(false)
      setLoadSucceeded(true)
    }, 200)
  }

  const onLoadError = () => {
    if (source !== '') {
      setError(true)
    }
  }

  // reanimated style
  const imageStyle = useAnimatedStyle(() => ({
    opacity: opacityImg.value,
  }))

  const imageOnloadStyle = useAnimatedStyle(() => ({
    opacity: opacityOnLoad.value,
  }))

  // render
  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View
        style={[
          styles.viewOnLoad,
          Boolean(bgColor) && { backgroundColor: bgColor },
          imageOnloadStyle,
        ]}
      />
      <Animated.View style={[StyleSheet.absoluteFillObject, imageStyle]}>
        <FastImage
          {...rest}
          onLoadStart={onLoadImageStart}
          resizeMode={resizeMode}
          onError={onLoadError}
          onLoad={onLoadImageSucceeded}
          style={[styles.img, styleOverride]}
          source={{ uri: source }}
        />
      </Animated.View>
      {error && (
        <Animated.View style={[styles.viewError]}>
          {childrenError}
        </Animated.View>
      )}
    </View>
  )
}

export const Image = (props: ImageProps) => {
  const [isChange, setIsChange] = useAsyncState<boolean>(false)
  useMounted(() => {
    setIsChange(true, () => {
      setIsChange(false)
    })
  }, [props.source])

  return isChange ? null : <ImageComponent {...props} />
}

export default Image
