import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/counter/counterSlice'
import loadingReducer from './features/loading/loadingSlice'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch