import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { CustomTextProps } from './type'
import { sizeScale } from '@/Common/Scale'
import { kFontFamily } from '@/Common/Constants'

const RegularText = (props: CustomTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      {...props}
      style={[styles.text, props.style]}
    >
      {props.children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: sizeScale(14),
    // fontFamily: kFontFamily.REGULAR,
  },
})

export default RegularText
