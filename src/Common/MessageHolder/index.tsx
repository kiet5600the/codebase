import { MessageDialogRef, MessageObject } from '@/Components/MessageDialog'
import { createRef } from 'react'

export const messageDialogHolder = createRef<MessageDialogRef>()

export const showMessage = (messageObject: MessageObject) => {
  messageDialogHolder.current?.show(messageObject)
}

export const hideMessage = () => {
  messageDialogHolder.current?.hide()
}
