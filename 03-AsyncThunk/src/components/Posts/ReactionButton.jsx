import { useDispatch } from "react-redux";
import { reactionAdded } from "../../reducer/postSlice";


const emojis = {
    thumbsUp: '👍',
    wow: '😲',
    heart: '❤️',
    rocket: '🚀',
    coffee: '🍵'
}
import React from 'react'
import { Button, Stack } from "@mui/material";

export const ReactionButton = ({ post }) => {

    const dispatch = useDispatch()

    const handleSubmit = (e, id, name) => {
        e.preventDefault();

        dispatch(reactionAdded({ postId: id, reaction: name }))
    }

    const reactionButtons = Object.entries(emojis).map(([name, emoji]) => {
        return (
            <Button spac variant="contained" size='small' key={name} onClick={(e) => handleSubmit(e, post.id, name)}>
                {emoji} {post.reactions[name]}
            </Button>
        )
    })

    return (
        <>
            <Stack spacing={2}>
                {reactionButtons}
            </Stack>
        </>
    )
}
