import { configureStore } from '@reduxjs/toolkit'
import PostReducer from '../features/Post/postSlice'
import UserReducer from '../features/User/userSlice'

export const store = configureStore({
    reducer: {
        post: PostReducer,
        user: UserReducer,
    }
})