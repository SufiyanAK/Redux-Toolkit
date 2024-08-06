import { Stack, Typography } from '@mui/material';
import { PostList } from './components/Posts/PostList'
import { PostForm } from './components/Posts/PostForm'
function App() {

  return (
    <>
      <Stack alignItems='center'>
        <PostForm />
        <PostList />
      </Stack>
    </>
  )
}

export default App
