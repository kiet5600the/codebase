import { ENVFields } from '@/Config/Env'

export interface AppState {
  internetState: boolean
  firstTimeLauch: boolean
  env: ENVFields | any
}
