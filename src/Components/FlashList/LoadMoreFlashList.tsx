import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { LoadMoreListProps } from './type'
import FooterLoader from '../Loader/FooterLoader'

const LoadMoreFlashList = (props: LoadMoreListProps<any>) => {
  const {
    data,
    renderItem,
    renderFooter = null,
    renderHeader,
    isLoading,
    page,
    handleLoadMore,
    handleRefresh,
  } = props

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState<boolean>(true)

  const [refresh, setRefresh] = useState<boolean>(false)

  const onRefresh = async (): Promise<void> => {
    setRefresh(true)
    await handleRefresh()
    setRefresh(false)
  }

  return (
    <FlashList
      {...props}
      data={data}
      renderItem={renderItem}
      removeClippedSubviews
      renderFooter={
        renderFooter ?? <FooterLoader loading={isLoading} page={page} />
      }
      {...(renderHeader && { ListHeaderComponent: renderHeader })}
      onRefresh={onRefresh}
      refreshing={refresh}
      onEndReached={() => {
        if (!onEndReachedCalledDuringMomentum) {
          handleLoadMore()
          setOnEndReachedCalledDuringMomentum(true)
        }
      }}
      onMomentumScrollBegin={() => setOnEndReachedCalledDuringMomentum(false)}
      onEndReachedThreshold={0.01}
    />
  )
}

export default LoadMoreFlashList

const styles = StyleSheet.create({})
