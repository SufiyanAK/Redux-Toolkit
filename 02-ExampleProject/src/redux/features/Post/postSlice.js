import { createSlice, nanoid } from '@reduxjs/toolkit'

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
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                    }
                }
            }
        }
    }
})

export const postStates = (state) => state.post.posts

export default postSlice.reducer

export const { addPosts } = postSlice.actions