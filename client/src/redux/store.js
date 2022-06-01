import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux";
import userReducer from "./userRedux";
import vendorReducer from "./vendorRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderRedux";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const appReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  vendor: vendorReducer,
  product: productReducer,
  order: orderReducer,
}); // use combine reducers to combine add and cart reducers

const persistedReducer = persistReducer(persistConfig, appReducer); // persist reducers

const rootReducer = (state, action) => {
  // create root reducer to handle logout or return persisted reducer
  if (action.type === "user/logout") {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return persistedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer, // add all reducers to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
