import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import {
  storageMethod,
  deleteKeyFromStorage,
  getValueFromStorage,
  saveToStorage,
} from '@/Common/Storage'
import { AuthState } from '@/Models/Auth'
import { NetWorkService } from '@/Networking'
import { appActions } from '../AppSlice'

const initialAtuhState: AuthState = {
  loadingLogin: false,
  access_token: null,
  refresh_token: null,
  user_info: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAtuhState,
  reducers: {
    onSetToken: (state: AuthState, { payload }: PayloadAction<string>) => {
      state.access_token = payload
    },
  },
  extraReducers: builder => {},
})

export const { reducer: authReducer, actions: authActions } = authSlice
