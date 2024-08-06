import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = {
    posts: [],
}

const postSlice = createSlice({
    name: 'Post',
    initialState,
    reducers: {
        addPosts: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content, userName) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userName,
                        date: sub(new Date(), { minutes: 10 }).toISOString(),
                    }
                }
            }
        }
    }
})

export const postStates = (state) => state.post.posts

export default postSlice.reducer

export const { addPosts } = postSlice.actions