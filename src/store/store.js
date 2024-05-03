import { configureStore } from '@reduxjs/toolkit'
import sceneSlice from "./slices/scene";
import {concentrationSlice} from "./slices/concentration";
import {relaxationSlice} from "./slices/relaxation";

export const store = configureStore({
  reducer: {
    scene: sceneSlice,
    concentration: concentrationSlice,
    relaxation: relaxationSlice,
  },
})