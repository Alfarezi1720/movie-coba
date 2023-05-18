const initialState = {
  token: localStorage.getItem('token') || null,
  isLoggedIn: !!localStorage.getItem('token'),
  user: null,
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

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      }
    case 'SET_IS_LOGGED_IN':
      return {
        ...state,
        isLoggedIn: action.payload,
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      }
    default:
      return state
  }
}

export default authReducer
