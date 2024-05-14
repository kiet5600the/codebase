import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  storageMethod,
  getValueFromStorage,
  saveToStorage,
} from '@/Common/Storage'
import ENVConfig, { ENVDynamic, ENVName } from '@/Config/Env'
import { AppState } from '@/Models/App'

const initialAppState: AppState = {
  internetState: true,
  firstTimeLauch: false,
  env: undefined,
}
const appSlice = createSlice({
  name: 'app',
  initialState: initialAppState,
  reducers: {
    onSetInternet: (state: AppState, { payload }: PayloadAction<boolean>) => {
      state.internetState = payload
    },
    onFirstTimeLauch: (state: AppState) => {
      saveToStorage('showIntroduce', false)
      state.firstTimeLauch = false
    },
    onAppinit: (state: AppState) => {
      const showIntroduce = getValueFromStorage(
        storageMethod.Boolean,
        'showIntroduce',
      ) as boolean
      // state.firstTimeLauch = showIntroduce !== undefined ? showIntroduce : true;

      const envConfig = getValueFromStorage(
        storageMethod.String,
        'envConfig',
      ) as ENVName

      if (envConfig) {
        state.env = ENVDynamic(envConfig)
      } else {
        state.env = ENVConfig
      }
    },
  },
})
export const { reducer: appReducer, actions: appActions } = appSlice
