import { PostForm } from "./redux/features/Post/PostForm"
import { PostList } from "./redux/features/Post/PostList"
import { Stack, Typography } from '@mui/material'

function App() {

  return (
    <>
      <Stack justifyContent='center' spacing={2} alignItems='center' sx={{}}>
        <Typography variant="h1" sx={{ fontSize: '3rem' }}>Redux Example Project</Typography>
        <PostForm />
        <PostList />
      </Stack>
    </>
  )
}

export default App
