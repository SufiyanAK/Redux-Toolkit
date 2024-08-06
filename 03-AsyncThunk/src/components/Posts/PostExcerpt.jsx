import { PostAuther } from './PostAuther'
import { TimeAgo } from './TimeAgo'
import { ReactionButton } from './ReactionButton'
import { Stack, Typography } from '@mui/material'


export const PostExcerpt = ({ post }) => {
    return (
        <>
            <Stack key={post.id}>
                <Typography variant='h5'>{post.title}</Typography>
                <Typography variant='p'>{post.body}</Typography>
                <Typography variant='p'>
                    <PostAuther userName={post.userName} />
                    <TimeAgo timestamps={post.date} />
                </Typography>
                <ReactionButton post={post} />
            </Stack>
        </>
    )
}
