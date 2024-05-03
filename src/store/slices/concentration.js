import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const concentrationSlice = createSlice({
  name: 'concentration',
  initialState,
  reducers: {
    setConcentration: (state, action) => {
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setConcentration } = concentrationSlice.actions

export default concentrationSlice.reducer