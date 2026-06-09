// src/store/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// createAsyncThunk = بتعمل API call وبتتعامل مع loading/success/error تلقائي
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('/api/auth/login', formData)
      return response.data  // هيروح لـ fulfilled
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)  // هيروح لـ rejected
    }
  }
)

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {       // 👈 ضيفي دي
      const { user, accessToken } = action.payload
      state.user = user
      state.accessToken = accessToken
      state.isAuthenticated = true
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('accessToken', accessToken)
    },
    logout: (state) => {
      state.user = null
      state.accessToken = null
      state.isAuthenticated = false
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
    },
  },

  // extraReducers = بتتعامل مع الـ async thunk
  extraReducers: (builder) => {
    builder
      // لما الريكوست بتبدأ
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      // لما الريكوست تنجح
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.accessToken = action.payload.accessToken
        state.isAuthenticated = true
        // خزّن في localStorage عشان يفضل بعد الريفريش
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        localStorage.setItem('accessToken', action.payload.accessToken)
      })
      // لما الريكوست تفشل
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload  // الرسالة اللي جت من الباك
      })
  },
})

export const { logout, setCredentials } = authSlice.actions
export default authSlice.reducer

// Selectors — عشان تجيبي البيانات في أي كومبوننت
export const selectUser = (state) => state.auth.user
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated
export const selectAuthLoading = (state) => state.auth.loading
export const selectAuthError = (state) => state.auth.error