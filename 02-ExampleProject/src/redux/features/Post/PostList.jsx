import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { postStates } from './postSlice'

export const PostList = () => {

    const posts = useSelector(postStates)


    return (
        <>
            <Typography variant='h4'>Post List</Typography>
            <Stack>
                {
                    posts.map((post) => (
                        <Stack key={post.id}>
                            <Typography variant='h5'>{post.title}</Typography>
                            <Typography variant='p'>{post.content}</Typography>

                        </Stack>
                    ))
                }
            </Stack>
        </>
    )
}
