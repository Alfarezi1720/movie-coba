import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import authReducers from './authReducers' // Ubah nama file menjadi authReducers.js

// Create the store
export default configureStore({
  reducer: authReducers, // Ubah nama reducer menjadi authReducers
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})
