import { configureStore, combineReducers } from '@reduxjs/toolkit';
import inventoryReducer from './features/inventory/inventorySlice';
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import ordersSlice from './features/orders/ordersSlice';

const persistConfig = {
    key: 'root',
    storage,
    version: 1
}

//method used to combine multiple reducers
const rootReducer = combineReducers({ inventory: inventoryReducer, orders: ordersSlice })

//wrapping persistance with the config written above
const persistedReducer = persistReducer(persistConfig, rootReducer)

//this creates the redux store
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