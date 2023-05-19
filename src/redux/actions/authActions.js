import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { parseJwt } from '../../utils/index'
import {
  setToken as setTokenAction,
  setIsLoggedIn as setIsLoggedInAction,
  setUser as setUserAction,
} from '../reducers/authReducers'
import { useDispatch } from 'react-redux'

export const loginAction = (formData) => async (dispatch) => {
  try {
    let data = {
      email: formData.email,
      password: formData.password,
    }

    let config = {
      method: 'post',
      url: `${import.meta.env.VITE_API_URL}/v1/auth/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    }

    const response = await axios.request(config)
    const { token } = response.data.data
    const { name } = parseJwt(token)

    localStorage.setItem('token', token)

    toast.success(`Welcome back! ${name}`)

    dispatch(setTokenAction(token))
    dispatch(setIsLoggedInAction(true))
    dispatch(setUserAction(name))

    const navigate = useNavigate()
    navigate('/')
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response.data.message)
      return
    }
    toast.error(error.message)
  }
}

export const setToken = (token) => ({
  type: 'SET_TOKEN',
  payload: token,
})

export const setIsLoggedIn = (isLoggedIn) => ({
  type: 'SET_IS_LOGGED_IN',
  payload: isLoggedIn,
})

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
})
