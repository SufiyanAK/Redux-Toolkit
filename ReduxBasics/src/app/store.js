import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../featured/counter/CounterSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
    }
})