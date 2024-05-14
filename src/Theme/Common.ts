/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'
import { CommonParams } from './theme'

export default function <C>({ Colors, ...args }: CommonParams<C>) {
  return {
    ...StyleSheet.create({
      backgroundPrimary: {
        backgroundColor: Colors.primary,
      },
      backgroundReset: {
        backgroundColor: Colors.transparent,
      },
      textInput: {
        borderWidth: 1,
        borderColor: Colors.text,
        backgroundColor: Colors.inputBackground,
        color: Colors.text,
        minHeight: 50,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      },
      boxShadow: {
        shadowOpacity: 0.1,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowRadius: 10,
        elevation: 3,
      },
    }),
  }
}
