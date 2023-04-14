import { configureStore } from '@reduxjs/toolkit'
import tabooSlice from './tabooSlice'

const store = configureStore({
  reducer: {
    taboo: tabooSlice.reducer,
  },
})

export default store