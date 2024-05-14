import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
// Common
import { sizeScale } from '@/Common/Scale'
// Theme
import { useTheme } from '@/Common/Hooks'
import { Colors } from '@/Theme/Variables'
// Icon
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { CheckBoxProps, CheckBoxRef } from './type'

const AnimatedIcon = Animated.createAnimatedComponent(Icon)

const CheckBox = forwardRef((props: CheckBoxProps, ref: Ref<CheckBoxRef>) => {
  useImperativeHandle(ref, () => ({
    isCheck: () => {
      return check
    },
  }))
  const { Layout } = useTheme()
  const [check, setCheck] = useState<boolean>(false)
  const {
    activeColor = Colors.primary,
    inActiveColor = Colors.transparent,
    checkColor = Colors.white,
    borderCheckColor = Colors.primary,
  } = props

  const progress = useSharedValue(0)
  const onToggle = (): void => {
    progress.value = withTiming(check ? 0 : 1)
    setCheck(prev => !prev)
  }
  const stylez = useAnimatedStyle(() => {
    const bg = interpolateColor(
      progress.value,
      [0, 1],
      [inActiveColor, activeColor],
    )
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [borderCheckColor, inActiveColor],
    )
    return {
      backgroundColor: bg,
      borderColor,
    }
  }, [check])

  const iconStylez = useAnimatedStyle(() => {
    const scaleIcon = interpolate(progress.value, [0, 0.2, 1], [0, 1.2, 1])
    return {
      transform: [{ scale: scaleIcon }],
    }
  }, [check])

  return (
    <Animated.View style={[styles.container, stylez]}>
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.checkbox, Layout.center]}
      >
        <AnimatedIcon
          name={'done'}
          size={sizeScale(14)}
          color={checkColor}
          style={iconStylez}
        />
      </TouchableOpacity>
    </Animated.View>
  )
})

const styles = StyleSheet.create({
  container: {
    width: sizeScale(17),
    height: sizeScale(17),
    borderWidth: 1.5,
    borderRadius: 2,
    marginRight: sizeScale(10),
  },
  checkbox: {
    flex: 1,
  },
})

export default CheckBox
