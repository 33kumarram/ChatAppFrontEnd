import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";
import persistReducer from "redux-persist/es/persistReducer";
import storage  from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
    key :'root',
    storage
}

const persistedReducer=persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistedStore = persistStore(store)