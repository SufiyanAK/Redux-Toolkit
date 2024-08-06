import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

const initialState = {
    Posts: [],
    status: 'idle',             // idle, success, loading, failed
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data; // corrected here
})

const PostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPosts: {
            reducer(state, action) {
                state.Posts.push(action.payload)
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

            const existingPost = state.Posts.find(post => post.id === postId)

            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'

                let min = 1
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), { minutes: min++ }).toISOString()
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    }
                    return post
                });

                // Add fetched Posts to array
                state.Posts = state.Posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const postStates = (state) => state.post.Posts
export const getPostStatus = (state) => state.post.status
export const getPostError = (state) => state.post.error

export default PostSlice.reducer

export const { addPosts, reactionAdded } = PostSlice.actions
