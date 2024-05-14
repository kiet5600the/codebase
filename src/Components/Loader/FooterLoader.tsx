import { Colors } from '@/Theme/Variables'
import React from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'

interface Props {
  loading: boolean
  page: number
}

const FooterLoader = ({ loading, page }: Props) => {
  if (loading && page !== 1) {
    return (
      <ActivityIndicator
        style={styles.indicator}
        size="small"
        color={Colors.primary}
      />
    )
  }
  return null
}

export default FooterLoader

const styles = StyleSheet.create({
  indicator: {
    marginVertical: 5,
    alignSelf: 'center',
  },
})
