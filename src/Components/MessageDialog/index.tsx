import { sizeScale } from '@/Common/Scale'
import { Colors } from '@/Theme/Variables'
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react'
import equals from 'react-fast-compare'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modal'
import { BoldText, RegularText } from '../Text'

export type MessageObject = {
  title: string
  message: string
  button: ButtonType[]
}

export type ButtonType = {
  text: string
  type: 'accept' | 'cancel' | 'logout'
  onPress?: () => void
}

const MessageDialogComponent = forwardRef((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: (messageObject: MessageObject) => {
        setVisible(true)
        setMessageObject(messageObject)
      },
      hide: () => {
        setVisible(false)
      },
    }),
    [],
  )
  const [visible, setVisible] = useState(false)
  const [messageObject, setMessageObject] = useState<MessageObject>({
    title: 'title',
    message: 'message',
    button: [
      {
        text: 'OK',
        type: 'accept',
        onPress: () => {},
      },
      {
        text: 'Cancel',
        type: 'cancel',
        onPress: () => {},
      },
    ],
  })
  // function
  const _onModalHide = useCallback(() => {}, [])
  // render
  return (
    <Modal
      isVisible={visible}
      backdropOpacity={0.5}
      onModalHide={_onModalHide}
      animationIn={'fadeIn'}
      style={[styles.modal]}
      animationOut={'fadeOut'}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <BoldText style={styles.titleText}>{messageObject.title}</BoldText>
          <RegularText style={styles.messageText}>
            {messageObject.message}
          </RegularText>
          <View style={styles.bottomBlock}>
            {messageObject.button.map(button => {
              if (button.type === 'accept') {
                return (
                  <TouchableOpacity
                    key={button.type}
                    style={[styles.skinBtn, styles.button]}
                    onPress={() => {
                      setVisible(false)
                      button.onPress && button.onPress()
                    }}
                  >
                    <Text style={[styles.skinBtnText]}>{button.text}</Text>
                  </TouchableOpacity>
                )
              }
              if (button.type === 'cancel') {
                return (
                  <TouchableOpacity
                    key={button.type}
                    style={styles.button}
                    onPress={() => {
                      setVisible(false)
                      button.onPress && button.onPress()
                    }}
                  >
                    <Text style={styles.underLineText}>{button.text}</Text>
                  </TouchableOpacity>
                )
              }
              if (button.type === 'logout') {
                return (
                  <TouchableOpacity
                    key={button.type}
                    style={styles.button}
                    onPress={() => {
                      setVisible(false)
                      button.onPress && button.onPress()
                    }}
                  >
                    <Text style={styles.underLineText}>{button.text}</Text>
                  </TouchableOpacity>
                )
              }
            })}
          </View>
        </View>
      </View>
    </Modal>
  )
})
export const MessageDialog = memo(MessageDialogComponent, equals)
export interface MessageDialogRef {
  show(messageObject: MessageObject): void
  hide(): void
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    marginVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    minHeight: sizeScale(100),
    width: sizeScale(335),
    borderRadius: sizeScale(30),
    backgroundColor: Colors.white,
    paddingHorizontal: sizeScale(16),
    paddingVertical: sizeScale(26),
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleText: {},
  messageText: {},
  bottomBlock: {
    marginTop: sizeScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
  skinBtnBg: {
    width: sizeScale(224),
    height: sizeScale(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  skinBtnText: {},
  skinBtn: {},
  button: {
    marginVertical: sizeScale(8),
  },
})
