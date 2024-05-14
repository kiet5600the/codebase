import { createSlice } from '@reduxjs/toolkit'
import themes from '@/Theme/themes'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { theme: 'default', darkMode: null } as ThemeState,
  reducers: {
    changeTheme: (
      state: ThemeState,
      { payload: { theme, darkMode } }: ThemePayload,
    ) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode
      }
    },
    setDefaultTheme: (
      state: ThemeState,
      { payload: { theme, darkMode } }: ThemePayload,
    ) => {
      if (!state.theme) {
        if (typeof theme !== 'undefined') {
          state.theme = theme
        }
        if (typeof darkMode !== 'undefined') {
          state.darkMode = darkMode
        }
      }
    },
  },
})

export const { reducer: themeReducer, actions: themeActions } = themeSlice

type DarkProps<T> = {
  [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never
}[keyof T]

type PropsWithoutDark<T> = Omit<T, DarkProps<T>>

export type ThemeState = {
  theme: 'default' | keyof PropsWithoutDark<typeof themes>
  darkMode: boolean | null
}

type ThemePayload = {
  payload: Partial<ThemeState>
}
