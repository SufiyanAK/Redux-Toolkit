import { useSelector } from 'react-redux'
import { userStates } from '../User/userSlice'
import { Typography } from '@mui/material'

export const PostAuther = ({ userName }) => {
    const users = useSelector(userStates)

    const author = users.find(user => user.userName === userName)

    return (
        <>
            <Typography variant='h4'>by {author ? author.userName : 'Unknown author'}</Typography>
        </>
    )
}
