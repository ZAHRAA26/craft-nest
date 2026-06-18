import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import adminService from '../../services/adminService';

export const fetchUsers = createAsyncThunk(
  'admin/fetchUsers',
  async (params, thunkAPI) => {
    try {
      const data = await adminService.getUsers(params);
      return data; // { users, total, pages }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ id, role }, thunkAPI) => {
    try {
      const data = await adminService.updateUserRole(id, role);
      return { id, role: data.user.role };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const toggleUserBlock = createAsyncThunk(
  'admin/toggleUserBlock',
  async (id, thunkAPI) => {
    try {
      const data = await adminService.toggleUserBlock(id);
      return { id, isBlocked: data.user.isBlocked };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const revokeUserRefresh = createAsyncThunk(
  'admin/revokeUserRefresh',
  async (id, thunkAPI) => {
    try {
      await adminService.revokeRefresh(id);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    loading: false,
    error: null,
    totalUsers: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users;
        state.totalUsers = action.payload.total;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const user = state.users.find(u => u._id === action.payload.id);
        if (user) user.role = action.payload.role;
      })
      .addCase(toggleUserBlock.fulfilled, (state, action) => {
        const user = state.users.find(u => u._id === action.payload.id);
        if (user) user.isBlocked = action.payload.isBlocked;
      });
  }
});

export default adminSlice.reducer;
