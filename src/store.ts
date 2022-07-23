import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import authReducer from "./features/auth/authSlice";
import exerciseReducer from "./features/exercises/exerciseSlice";
import userDataReducer from "./features/userData/userDataSlice";
import adminReducer from "./features/admin/adminSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        user: userDataReducer,
        exercises: exerciseReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
