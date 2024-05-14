import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import equals from 'react-fast-compare'
import { TabViewProps } from './type'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { MediumText } from '../Text'
import { sizeScale } from '@/Common/Scale'
import { kWidth } from '@/Common/Constants'
import { Layout } from '@/Theme'
import { sharedTiming } from '@/Common/Animated'
import { Colors } from '@/Theme/Variables'

const TabViewComponent = (props: TabViewProps) => {
  const {
    style,
    data,
    textStyle,
    focusTextColor,
    blurTextColor,
    sliderStyle,
    mgHorizontal,
    onIndexChange,
    currentIndex,
  } = props
  const slideValue = useSharedValue(0)
  const slideTranslateX = useAnimatedStyle(() => ({
    transform: [{ translateX: slideValue.value }],
  }))
  const tabMgHorizontal = mgHorizontal
    ? sizeScale(mgHorizontal + 5)
    : sizeScale(37)
  const tabWidth = (kWidth - tabMgHorizontal) / data.length
  return (
    <View style={[styles.tab, Layout.rowBetween, style]}>
      <Animated.View
        style={[
          { width: tabWidth },
          styles.slide,
          slideTranslateX,
          sliderStyle,
        ]}
      />
      {data.map((item, index) => {
        const onPress = () => {
          slideValue.value = sharedTiming(index * tabWidth)
          onIndexChange(index)
        }
        const isFocus = currentIndex === index
        const textColor =
          isFocus && focusTextColor
            ? focusTextColor
            : isFocus
            ? Colors.white
            : !isFocus && blurTextColor
            ? blurTextColor
            : Colors.placeHolder
        return (
          <TouchableOpacity
            onPress={onPress}
            style={[Layout.center, { flex: 1, height: '100%' }]}
            key={item.id}
          >
            <MediumText
              style={[{ color: textColor, fontSize: sizeScale(12) }, textStyle]}
            >
              {item.name}
            </MediumText>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tab: {
    height: sizeScale(50),
    backgroundColor: Colors.primary,
    marginHorizontal: sizeScale(16),
    marginBottom: 20,
    borderRadius: 8,
    ...Layout.boxShadow,
  },
  slide: {
    height: sizeScale(45),
    position: 'absolute',
    backgroundColor: Colors.disable,
    left: sizeScale(2.5),
    borderRadius: 5,
  },
})

export const TabView = memo(TabViewComponent, equals)
