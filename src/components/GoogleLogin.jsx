import React from 'react'
import { useSelector, useDispatch, Provider } from 'react-redux'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { loginAction } from '../redux/actions/authActions'
import store from '../redux/store'

const GoogleLogin = ({ accessToken, children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token)

  const registerLoginWithGoogleAction = async () => {
    try {
      await dispatch(loginAction({ access_token: accessToken || token }))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response.data.message)
        return
      }
      toast.error(error.message)
    }
  }

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      registerLoginWithGoogleAction(responseGoogle.access_token)
    },
  })

  return (
    <Provider store={store}>
      <button style={styleBtn} onClick={handleGoogleLogin}>
        {children}
      </button>
    </Provider>
  )
}

export default GoogleLogin

const styleBtn = {
  borderRadius: '80px',
  height: '44px',
  width: '100%',
  border: '1px solid #9e9e9e',
  background: '#fff',
  fontSize: '14px',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '10px',
}
