import { Button, FormControl, FormLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPosts } from './postSlice';



export const PostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch()

    const handleChange = (e, setInput) => {
        const { name, value } = e.target
        setInput(value)
        setErrors((prev) => ({ ...prev, [name]: !value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors({ title: !title, content: !content })

        if (!title.trim() || !content.trim()) {
            return console.log({ message: 'All Fields are Required' });
        }



        dispatch(addPosts(title, content))

        setTitle('')
        setContent('')
    }

    return (
        <>
            <Typography variant='h4'>Create Post</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel sx={{ fontWeight: 'bold' }}>Title:</FormLabel>
                        <TextField
                            value={title}
                            name='title'
                            size='small'
                            type='text'
                            onChange={(e) => handleChange(e, setTitle)}
                            error={errors.title}
                            helperText={errors.title ? 'Title is required' : ''}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel sx={{ fontWeight: 'bold' }}>Content:</FormLabel>
                        <TextField
                            value={content}
                            name='content'
                            size='small'
                            type='text'
                            onChange={(e) => handleChange(e, setContent)}
                            error={errors.content}
                            helperText={errors.content ? 'Content is required' : ''}
                        />
                    </FormControl>

                    <Button variant='contained' sx={{ textTransform: 'none' }} type='submit' >Add Post</Button>
                </Stack>
            </form>
        </>
    )
}
