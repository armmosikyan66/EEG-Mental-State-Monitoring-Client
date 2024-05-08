import { configureStore } from '@reduxjs/toolkit'
import sceneSlice from "./slices/scene";

export const store = configureStore({
  reducer: {
    scene: sceneSlice,
  },
})