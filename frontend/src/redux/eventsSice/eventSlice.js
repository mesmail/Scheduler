import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import axiosInstance from "../../utils/axiosInstance";

export const GetAllEvents = createAsyncThunk(
  "events/GetAllEvents",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosInstance.get("scheduler/events/");

      return req.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const BookEvent = createAsyncThunk(
  "events/BookEvent",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const req = await axiosInstance.post("scheduler/book_event/", data);

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
  add_load: false,
  error: null,
});

const eventsReducer = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: {
    [GetAllEvents.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllEvents.fulfilled]: (state, action) => {
      state.loading = false;
      eventAdapter.upsertMany(state, action);
    },
    [GetAllEvents.rejected]: (state, action) => {
      state.loading = false;
    },
    [BookEvent.pending]: (state, action) => {
      state.add_load = true;
    },
    [BookEvent.pending]: (state, action) => {
      state.add_load = false;
    },
  },
});

export const { selectAll: selectAllEvents, selectById: selectEventById } =
  eventAdapter.getSelectors((state) => state.events);

export default eventsReducer.reducer;
