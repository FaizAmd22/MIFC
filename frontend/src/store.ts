import { configureStore } from "@reduxjs/toolkit";
import themReducer from "./slices/themeSlice";

const store = configureStore({
    reducer: {
        theme: themReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;