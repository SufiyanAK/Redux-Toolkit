import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { postStates } from './postSlice'
import { PostAuther } from './PostAuther'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionButton'

export const PostList = () => {

    const posts = useSelector(postStates)

    const orderedPost = posts.slice().sort((a, b) => b.date.localCompare(a.date))

    return (
        <>
            <Typography variant='h4'>Post List</Typography>
            <Stack>
                {
                    orderedPost.map((post) => (
                        <Stack key={post.id}>
                            <Typography variant='h5'>{post.title}</Typography>
                            <Typography variant='p'>{post.content}</Typography>
                            <Typography variant='p'>
                                <PostAuther userName={post.userName} />
                                <TimeAgo timestamps={post.date} />
                            </Typography>
                            <ReactionButton post={post} />
                        </Stack>
                    ))
                }
            </Stack>
        </>
    )
}
