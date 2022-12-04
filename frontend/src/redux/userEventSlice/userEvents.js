import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import axiosInstance from "../../utils/axiosInstance";

export const GetAllUserEvents = createAsyncThunk(
  "events/GetAllEvents",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosInstance.get("scheduler/prev_booking/");
      return req.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const eventAdapter = createEntityAdapter({
  selectId: (event) => event.id,
});

const initialState = eventAdapter.getInitialState({
  loading: false,

  error: null,
});

const userEventsReducer = createSlice({
  name: "userEvents",
  initialState,
  reducers: {},
  extraReducers: {
    [GetAllUserEvents.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllUserEvents.fulfilled]: (state, action) => {
      state.loading = false;
      eventAdapter.upsertMany(state, action);
    },
    [GetAllUserEvents.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  selectAll: selectAllUserEvents,
  selectById: selectUserEventById,
} = eventAdapter.getSelectors((state) => state.events);

export default userEventsReducer.reducer;
