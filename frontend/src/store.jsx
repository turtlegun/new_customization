import { configureStore } from '@reduxjs/toolkit'

import  counterReducer from './counter_slice'


export const store = configureStore({
  reducer: {

counter:counterReducer

  },
})