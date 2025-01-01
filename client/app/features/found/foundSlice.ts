import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CounterState {
  found: boolean
}

const initialState: CounterState = {
  found: true,
}

export const counterSlice = createSlice({
  name: 'found',
  initialState,
  reducers: {
    setFound: (state, action: PayloadAction<boolean>) => {
        state.found = action.payload
        },
  },
})

// Action creators are generated for each case reducer function
export const { setFound } = counterSlice.actions

export default counterSlice.reducer