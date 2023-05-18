import axios from 'axios'
import { setPostDetails, setPosts } from '../reducers/postReducers'
import { toast } from 'react-toastify'

// Function to get all the posts
export const getAllPosts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/v1/movie`)
    dispatch(setPosts(response.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message)
      return
    }
    toast.error(error.message)
  }
}

// Function to get the details of a post
export const getPostDetails = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/v1/movie/${id}`,
    )
    dispatch(setPostDetails(response.data))
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message)
      return
    }
    toast.error(error.message)
  }
}
