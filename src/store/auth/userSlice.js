import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    avatar: '',
    user_info_id: '',
    user_id: '',
    username: '',
    name: '',
    email: '',
    authority: [],
}

export const userSlice = createSlice({
    name: 'auth/user',
    initialState,
    reducers: {
        setUser: (_, action) => action.payload,
        userLoggedOut: () => initialState,
    },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
