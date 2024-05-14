import { View } from 'react-native'
import React, { memo } from 'react'
import equals from 'react-fast-compare'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ContainerProps } from './type'
import { Layout } from '@/Theme'
import { useTheme } from '@/Common/Hooks'

const ContainerComponent = (props: ContainerProps) => {
  const insets = useSafeAreaInsets()
  const { Colors } = useTheme()
  const { safeAreaBackground = null, edges = null, style } = props
  return (
    <SafeAreaView
      style={[
        Layout.fill,
        { backgroundColor: safeAreaBackground ?? Colors.background },
      ]}
      edges={edges ?? ['top']}
    >
      <View
        style={[Layout.fill, { backgroundColor: Colors.background }, style]}
      >
        {props.children}
      </View>
    </SafeAreaView>
  )
}

export const Container = memo(ContainerComponent, equals)
