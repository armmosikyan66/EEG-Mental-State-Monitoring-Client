import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "concentration",
}

export const sceneSlice = createSlice({
  name: 'scene',
  initialState,
  reducers: {
    setScene: (state, action) => {
        state.value = action.payload
    }
  },
})

export const { setScene } = sceneSlice.actions

export default sceneSlice.reducer