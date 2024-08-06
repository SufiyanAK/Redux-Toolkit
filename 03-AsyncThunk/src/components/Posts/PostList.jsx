import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postStates, getPostStatus, getPostError, fetchPosts } from '../../reducer/postSlice'
import { PostExcerpt } from './PostExcerpt'

export const PostList = () => {
    const posts = useSelector(postStates)
    const postsStatus = useSelector(getPostStatus)
    const postsError = useSelector(getPostError)
    const dispatch = useDispatch();

    useEffect(() => {
        if (postsStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch, postsStatus])

    let content = '';
    if (postsStatus === 'loading') {
        content = <Typography>Loading...</Typography>
    } else if (postsStatus === 'succeeded') {
        const orderedPost = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
        content = orderedPost.map((post) => (
            <PostExcerpt key={post.id} post={post} />
        ))
    } else if (postsStatus === 'error') {
        content = <Typography>{postsError}</Typography>
    }


    return (
        <>
            <Typography variant='h4'>Post List</Typography>
            <Stack>
                {content}
            </Stack>
        </>
    )
}
