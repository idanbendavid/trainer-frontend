import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/user/auth/authSlice";
import adminReducer from "./features/admin/adminSlice";
import mediaReducer from "./features/media/mediaSlice"
import exerciseReducer from "./features/user/exercises/exerciseSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        media: mediaReducer,
        exercise: exerciseReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
