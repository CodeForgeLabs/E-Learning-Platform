"use client"
import React , {useEffect} from 'react'
import Loading from './components/Loading'
import { useDispatch , useSelector } from 'react-redux'
import {setInitialLoading} from './features/loading/loadingSlice'
import { RootState } from './store'


const Homepage = () => {
  

  const initialLoading = useSelector((state : RootState) => state.loading.initialLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    if (initialLoading ) {
      setTimeout(() => {
        dispatch(setInitialLoading())
      }, 2000)
      
    }
    
  })
  return (
    <div className='flex flex-grow'>
      {initialLoading ? (

          <Loading />
      
      ) : (
        <p></p>
      )}
      
    </div>
  )
}

export default Homepage
