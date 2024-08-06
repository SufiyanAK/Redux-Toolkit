import { Button, FormControl, FormLabel, MenuItem, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPosts } from '../../reducer/postSlice';
import { userStates } from '../../reducer/userSlice';

export const PostForm = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userName, setUserName] = useState('')
    const [errors, setErrors] = useState({})

    const users = useSelector(userStates)

    const dispatch = useDispatch()

    const handleChange = (e, setInput) => {
        const { name, value } = e.target
        setInput(value)
        setErrors((prev) => ({ ...prev, [name]: !value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setErrors({ title: !title, content: !content, userName: !userName })

        if (!title.trim() || !content.trim() || !userName) {
            return console.log({ message: 'All Fields are Required' });
        }

        dispatch(addPosts(title, content, userName))

        setTitle('')
        setContent('')
        setUserName('')
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
                        <FormLabel sx={{ fontWeight: 'bold' }}>Select User:</FormLabel>
                        <TextField
                            select
                            value={userName}
                            name='user'
                            size='small'
                            onChange={(e) => handleChange(e, setUserName)}
                            error={errors.title}
                            helperText={errors.title ? 'User is required' : ''}
                        >
                            {
                                users.map((user) => (
                                    <MenuItem key={user.id} value={user.userName}>{user.userName}</MenuItem>
                                ))
                            }
                        </TextField>
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
