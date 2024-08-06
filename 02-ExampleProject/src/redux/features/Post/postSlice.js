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
            prepare(title, content, userName) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userName,
                        date: new Date().toISOString(),
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload;

            const existingPost = state.posts.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const postStates = (state) => state.post.posts

export default postSlice.reducer

export const { addPosts, reactionAdded } = postSlice.actions