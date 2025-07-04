import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'slice',
    initialState: {
        current: {
            name: 'admin',
            authorities: []
        },
        isLoading: true
    },
    reducers: {
        current: (state, action) => {
            state.current = action.payload
            state.isLoading = false
        }
    }
})

export const { current } = userSlice.actions
export default userSlice.reducer