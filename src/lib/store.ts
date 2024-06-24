import { configureStore, combineReducers } from '@reduxjs/toolkit';
import inventoryReducer from './features/inventory/inventorySlice';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

const rootReducer = combineReducers({ inventory: inventoryReducer })

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({

    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;