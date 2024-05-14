import { sizeScale } from '@/Common/Scale'
import { Layout } from '@/Theme'
import { Colors } from '@/Theme/Variables'
import React, {
  forwardRef,
  memo,
  Ref,
  useImperativeHandle,
  useState,
} from 'react'
import equals from 'react-fast-compare'
import { StyleSheet, View } from 'react-native'
import { WaveIndicator } from 'react-native-indicators'
import { AppLoaderRef } from './type'

const AppLoaderComponent = forwardRef((props, ref: Ref<AppLoaderRef>) => {
  useImperativeHandle(
    ref,
    () => ({
      show: () => {
        setVisible(true)
      },
      hide: () => {
        setVisible(false)
      },
    }),
    [],
  )
  const [visible, setVisible] = useState<boolean>(false)

  return (
    <>
      {visible && (
        <View
          style={[
            Layout.fillAbsolute,
            Layout.fullSize,
            Layout.center,
            styles.container,
          ]}
        >
          <View style={[Layout.boxShadow, styles.wrapper]}>
            <WaveIndicator size={sizeScale(30)} color={Colors.primary} />
          </View>
        </View>
      )}
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    backgroundColor: Colors.white,
    height: sizeScale(50),
    width: sizeScale(50),
    borderRadius: 10,
  },
})

export const AppLoader = memo(AppLoaderComponent, equals)
