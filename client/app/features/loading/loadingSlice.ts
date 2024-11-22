import { createSlice } from '@reduxjs/toolkit'


export interface loadingState {
  initialLoading: boolean
}

const initialState: loadingState  = {
  initialLoading: true,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setInitialLoading: (state) => {
        state.initialLoading = false
        },
  },
})

// Action creators are generated for each case reducer function
export const { setInitialLoading } = loadingSlice.actions

export default loadingSlice.reducer