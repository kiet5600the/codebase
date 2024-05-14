import React, {
  useEffect,
  useRef,
  SetStateAction,
  useState,
  useCallback,
} from 'react'

function useIsMounted() {
  const isMountedRef = useRef<boolean | null>(null)
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])
  return isMountedRef
}

function useStateWhenMounted<T>(initialValue: any) {
  const [state, setState] = useState(initialValue)
  const isMounted = useRef(true)
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const setNewState = useCallback((value: T) => {
    if (isMounted.current) {
      setState(value)
    }
  }, [])

  return [state, setNewState]
}

function useMounted(callback: () => void, deps: any[] = []) {
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      callback()
    }
  }, [...deps])
}

function useAsyncState<T>(
  initialValue: T,
): [
  T,
  (newValue: SetStateAction<T>, callback?: (newState: T) => void) => void,
] {
  const [state, setState] = useState(initialValue)
  const _callback = useRef<(newState: T) => void>()

  const _setState = (
    newValue: SetStateAction<T>,
    callback?: (newState: T) => void,
  ) => {
    if (callback) {
      _callback.current = callback
    }
    setState(newValue)
  }

  useEffect(() => {
    if (typeof _callback.current === 'function') {
      _callback.current(state)
      _callback.current = undefined
    }
  }, [state])
  return [state, _setState]
}

function useRefresh() {
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isRefreshing) {
        setIsRefreshing(false)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [isRefreshing])

  return [
    isRefreshing,
    () => {
      setIsRefreshing(true)
    },
  ] as const
}

export {
  useMounted,
  useIsMounted,
  useAsyncState,
  useRefresh,
  useStateWhenMounted,
}
