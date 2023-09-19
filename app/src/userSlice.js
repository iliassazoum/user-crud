import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// Define async thunks for fetching and updating users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("http://localhost:8080/users");
  return response.data;
});

export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await axios.post("http://localhost:8080/users", user);
  return response.data;
});

export const updateUser = createAsyncThunk("users/updateUser", async (user) => {
  const response = await axios.put(
    `http://localhost:8080/users/${user.id}`,
    user
  );
  return response.data;
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  await axios.delete(`http://localhost:8080/users/${id}`);
  return id;
});

// Create a user slice with reducers for actions
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const existingUserIndex = state.users.findIndex(
          (user) => user.id === updatedUser.id
        );
        if (existingUserIndex !== -1) {
          state.users[existingUserIndex] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
