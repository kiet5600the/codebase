import { FlashListProps } from '@shopify/flash-list'

export interface LoadMoreListProps<T> extends FlashListProps<any> {
  data: T[]
  renderHeader?: any
  renderFooter?: any
  renderItem: any
  isLoading: boolean
  page: number
  handleLoadMore: Function
  handleRefresh: Function
}
