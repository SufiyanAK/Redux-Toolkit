import { configureStore } from '@reduxjs/toolkit'
import PostReducer from '../features/Post/postSlice'

export const store = configureStore({
    reducer: {
        post: PostReducer,
    }
})