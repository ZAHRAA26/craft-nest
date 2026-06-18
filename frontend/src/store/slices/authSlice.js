// src/store/slices/authSlice.js
<<<<<<< HEAD
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
=======
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';

// Thunks
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const data = await authService.login(credentials);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, thunkAPI) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      await authService.logout(refreshToken);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, thunkAPI) => {
    try {
      const data = await authService.getMe();
      return data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem('user');
    if (user === null || user === 'undefined') return null;
    return JSON.parse(user);
  } catch (error) {
    localStorage.removeItem('user');
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  loading: false,
  error: null,
<<<<<<< HEAD
}
=======
  success: false,
};
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
<<<<<<< HEAD
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
=======
    resetAuthState: (state) => {
      state.error = null;
      state.success = false;
      state.loading = false;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.clear();
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isAuthenticated = false;
        localStorage.clear();
      })
      // Fetch Me (Session Sync)
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(fetchMe.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.clear();
      });
  },
});

export const { resetAuthState, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAdmin = (state) => state.auth.user?.role === 'ADMIN';
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthSuccess = (state) => state.auth.success;
>>>>>>> 6e1dabcda81dddb42ef37623e440695202dc1dfb
