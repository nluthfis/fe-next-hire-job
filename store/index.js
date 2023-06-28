import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import counterSlice from "./reducers/counterSlice";
import authReducer from "./reducers/authSlice";
import userSlice from "./reducers/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: process.env.NEXT_PUBLIC_SECRET_KEY,
      onError: function (error) {
        console.log(error);
      },
    }),
  ],
};

const rootReducer = combineReducers({
  counterSlice,
  auth: authReducer,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
