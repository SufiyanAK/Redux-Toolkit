import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    users: [{ id: '1', userName: 'Sufiyan' }, { id: '2', userName: 'Hiba' }],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: {
            reducer(state, action) {
                state.users.push(action.payload)
            },
            prepare(userName) {
                return {
                    payload: {
                        id: nanoid(),
                        userName,
                    }
                }
            }
        }
    }
})

export const userStates = (state) => state.user.users

export default userSlice.reducer

export const { addUser } = userSlice.actions