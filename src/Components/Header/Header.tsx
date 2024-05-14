import React, { memo } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import equals from 'react-fast-compare'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderProps } from './type'
import { MediumText } from '../text'
import { useNavigation } from '@react-navigation/native'
import { Layout } from '@/Theme'
import { sizeScale } from '@/Common/Scale'
import { Colors } from '@/Theme/Variables'

export const Header = (props: HeaderProps) => {
  const {
    title,
    style,
    textStyle,
    hideGoback,
    onBackIconPress,
    rightIcon,
    onRightIconPress,
  } = props
  const navigation = useNavigation<any>()
  const onGoBack = (): void => {
    if (navigation.canGoBack) {
      navigation.goBack()
    }
  }
  return (
    <View style={[Layout.rowBetween, styles.container, props.style]}>
      {!props.hideGoback ? (
        <TouchableOpacity
          onPress={onBackIconPress ?? onGoBack}
          style={[Layout.center, styles.leftButton]}
        >
          <Icon name="chevron-left" size={sizeScale(24)} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButton} />
      )}
      <MediumText numberOfLines={1} style={[styles.text, props.textStyle]}>
        {title}
      </MediumText>
      {rightIcon ? (
        <TouchableOpacity
          onPress={onRightIconPress}
          style={[Layout.center, styles.leftButton]}
        >
          <Icon name={rightIcon} size={sizeScale(24)} color={Colors.white} />
        </TouchableOpacity>
      ) : (
        <View style={styles.leftButton} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: sizeScale(40),
    backgroundColor: Colors.primary,
    paddingHorizontal: sizeScale(5),
  },
  text: {
    flex: 1,
    color: Colors.white,
    fontSize: sizeScale(16),
    textAlign: 'center',
  },
  leftButton: {
    height: sizeScale(30),
    width: sizeScale(30),
  },
})
