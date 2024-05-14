import React, { memo } from 'react'
import { StyleSheet, View } from 'react-native'
import equals from 'react-fast-compare'
import Toast from 'react-native-toast-message'
import { BoldText, MediumText } from '../Text'
import { sizeScale } from '@/Common/Scale'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '@/Theme/Variables'
import { Layout } from '@/Theme'

const toastConfig = {
  toastMessage: ({ text1, props }: any) => (
    <View style={[Layout.rowCenter, styles.toast]}>
      {props.icon && (
        <Icon
          name={props.icon}
          size={sizeScale(props.size)}
          style={styles.icon}
          color={Colors.white}
        />
      )}
      <BoldText style={styles.text}>{text1}</BoldText>
    </View>
  ),
}

const ToastMessageComponent = () => {
  return <Toast config={toastConfig} bottomOffset={30} />
}

const styles = StyleSheet.create({
  toast: {
    marginHorizontal: sizeScale(10),
    height: sizeScale(37),
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  text: {
    color: Colors.white,
    fontSize: sizeScale(12),
  },
  icon: {
    marginRight: 10,
  },
})

const ToastMessage = memo(ToastMessageComponent, equals)

export default ToastMessage
