import { configureStore } from '@reduxjs/toolkit'
import PostReducer from '../reducer/postSlice'
import UserReducer from '../reducer/userSlice'

export const store = configureStore({
    reducer: {
        post: PostReducer,
        user: UserReducer,
    }
})