import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const relaxationSlice = createSlice({
  name: 'relaxation',
  initialState,
  reducers: {
    setRelaxation: (state, action) => {
        state.value = action.payload
    }
  },
})

export const { setRelaxation } = relaxationSlice.actions

export default relaxationSlice.reducer