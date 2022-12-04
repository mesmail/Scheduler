import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import { toastOnError } from "../../utils/utils";

import axiosInstance, { setAxiosAuthToken } from "../../utils/axiosInstance";

export const RegisterUser = createAsyncThunk(
  "auth/register",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosInstance.post("auth/users/", userData);

      toast.success(
        `Register Success Login Wiht username ${userData.username}`
      );
      return req.data;
    } catch (error) {
      toastOnError(error);

      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosInstance.post("auth/token/login/", userData);
      const { auth_token } = req.data;
      setAxiosAuthToken(auth_token);
      dispatch(authSuccess(auth_token));
      dispatch(getCurrentUser());
      toast.success("Login Success");
    } catch (error) {
      toastOnError(error);
      dispatch(unSetCurrentUser());
      return rejectWithValue(error.response.data);
    }
  }
);

export const authSuccess = createAsyncThunk("auth/setToken", async (token) => {
  setAxiosAuthToken(token);
  localStorage.setItem("token", token);
  return token;
});

export const getCurrentUser = createAsyncThunk(
  "auth/getUser",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("auth/users/me/");

      dispatch(setCurrentUser(response.data));
    } catch (error) {
      dispatch(logout());
      toastOnError(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const setCurrentUser = createAsyncThunk(
  "auth/setUser",

  async (user, { dispatch }) => {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  }
);

export const unSetCurrentUser = createAsyncThunk(
  "auth/unSetUser",

  async (_, { dispatch }) => {
    setAxiosAuthToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
);

export const logout = createAsyncThunk(
  "auth/logout",

  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("auth/token/logout/");
      dispatch(unSetCurrentUser());
      toast.success("Logout successful.");
    } catch (error) {
      dispatch(unSetCurrentUser());
      toastOnError(error);
      return rejectWithValue(error);
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  "auth/updateUserSettings",

  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("auth/users/me/", data);
      // console.log(response.data);

      dispatch(setCurrentUser(response.data));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  user: null,
  isAuthenticated: false,
  token: "",
  AuthSuccessLoading: false,
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state) => {
      state.loading = false;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.token = "";
    },
    [getCurrentUser.pending]: (state, action) => {
      state.AuthSuccessLoading = true;
    },

    [authSuccess.pending]: (state) => {
      state.AuthSuccessLoading = true;
    },
    [authSuccess.fulfilled]: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.loading = false;
      state.AuthSuccessLoading = false;
    },

    [setCurrentUser.fulfilled]: (state, action) => {
      state.error = null;
      state.loading = false;
      state.user = action.payload;
    },

    [logout.fulfilled]: () => {
      return initialState;
    },
    [unSetCurrentUser.fulfilled]: () => {
      return initialState;
    },
  },
});

export default authReducer.reducer;
