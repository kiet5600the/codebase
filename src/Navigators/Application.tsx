import React, { useEffect } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
// List Animated Wrapper
import { Transitioning } from 'react-native-reanimated'
import { transition, _transitionApp } from '@/Components/TransitionContainer'
import { Layout } from '@/Theme'
// Keyboard
import KeyboardManager from 'react-native-keyboard-manager'
import { AvoidSoftInput } from 'react-native-avoid-softinput'
// Navigation
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './BottomTab/Main'
import { navigationRef } from './utils'
// RTK
import { useAppDispatch, useAppSelector } from '@/Common/Hooks/useRTK'
import { RXStore } from '@/Store/utils'
import { appActions } from '@/Store/Slices'
// Theme
import { useTheme } from '@/Common/Hooks'
// Components
import ToastMessage from '@/Components/ToastMessage'
import { AppMode } from '@/Components/AppMode'
import { AppLoader } from '@/Components/Loader'
import { isIos } from '@/Common/Device'
import { MessageDialog } from '@/Components/MessageDialog'
import { messageDialogHolder } from '@/Common/MessageHolder'
import { appLoaderHolder } from '@/Common/AppLoaderHolder'

const ApplicationNavigator = () => {
  const dispatch = useAppDispatch()
  const { darkMode, NavigationTheme } = useTheme()
  const { env } = useAppSelector(state => state.app)

  useEffect(() => {
    if (isIos) {
      if (darkMode) {
        KeyboardManager.setKeyboardAppearance('dark')
      } else {
        KeyboardManager.setKeyboardAppearance('light')
      }
    }
  }, [darkMode])

  useEffect(() => {
    dispatch(appActions.onAppinit())
  }, [])

  return (
    <GestureHandlerRootView style={styles.rootView}>
      <BottomSheetModalProvider>
        <Transitioning.View
          style={[Layout.fill]}
          transition={transition}
          ref={_transitionApp}
        >
          <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
            <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
            <MainNavigator />
            <ToastMessage />
            <AppLoader ref={appLoaderHolder} />
            <MessageDialog ref={messageDialogHolder} />
            <RXStore />
            {env && env.APP_ENV !== 'Prod' && <AppMode envMode={env.APP_ENV} />}
          </NavigationContainer>
        </Transitioning.View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  rootView: {
    alignSelf: 'stretch',
    flex: 1,
  },
})

export default ApplicationNavigator
