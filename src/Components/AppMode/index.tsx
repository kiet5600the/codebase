import React, { memo, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import isEqual from 'react-fast-compare'

const styles = StyleSheet.create({
  textMode: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: 11,
    textAlign: 'center',
  },
  wrapMode: {
    position: 'absolute',
    right: -20,
    top: 0,
    zIndex: 999,
    width: 150,
    backgroundColor: '#F0A939',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    transform: [{ rotate: '45deg' }, { translateX: 30 }],
  },
})

const modeToString = (mode: string): string => {
  switch (mode) {
    case 'Dev':
      return 'DevMode'
    case 'Staging':
      return 'StagingMode'
    default:
      return ''
  }
}
const AppModeComponent = ({ envMode }: { envMode: string }) => {
  const [appMode, setAppMode] = useState<boolean>(true)
  return (
    <TouchableOpacity
      style={[styles.wrapMode]}
      onPress={() => {
        setAppMode(prev => !prev)
      }}
    >
      {appMode && (
        <Text adjustsFontSizeToFit={true} style={[styles.textMode]}>
          {modeToString(envMode)}
        </Text>
      )}
    </TouchableOpacity>
  )
}

export const AppMode = memo(AppModeComponent, isEqual)
