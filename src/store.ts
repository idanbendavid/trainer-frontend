import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/auth/authSlice";
import adminReducer from "./features/admin/adminSlice";
import mediaReducer from "./features/media/mediaSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        media: mediaReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
