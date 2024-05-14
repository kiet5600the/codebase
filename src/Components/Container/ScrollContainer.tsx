import { ScrollView, View } from 'react-native'
import React, { memo } from 'react'
import equals from 'react-fast-compare'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollContainerProps } from './type'
import { Layout } from '@/Theme'
import { useTheme } from '@/Common/Hooks'

const ScrollContainerComponent = (props: ScrollContainerProps) => {
  const { Colors } = useTheme()
  const {
    safeAreaBackground = null,
    edges = null,
    contentContainerStyle,
    style,
  } = props
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
        <ScrollView contentContainerStyle={[contentContainerStyle]}>
          {props.children}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export const ScrollContainer = memo(ScrollContainerComponent, equals)
