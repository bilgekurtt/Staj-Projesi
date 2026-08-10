import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    requestCount: number;
}

const initialState: LoadingState = {
    requestCount: 0,
}

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        requestStarted: (state) => {
            state.requestCount += 1;
        },

    requestFinished: (state) => {
        state.requestCount = Math.max(0, state.requestCount - 1);
        },
    },
});

export const {
    requestStarted, requestFinished
} = loadingSlice.actions;

export default loadingSlice.reducer;
