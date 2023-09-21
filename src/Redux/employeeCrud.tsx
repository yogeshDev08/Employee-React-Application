// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { staticList } from '../Constants/StaticData'

  export const personalDetailsUpdate = createAsyncThunk('appSizes/personalDetailsUpdate', async (data: any) => {
    return data
    
  })

  export const bankDetailsUpdate = createAsyncThunk('appSizes/bankDetailsUpdate', async (data: any) => {
    return data
  })

  export const experienceDetailUpdate = createAsyncThunk('appSizes/experienceDetailUpdate', async (data: any) => {
    return data
  })

  export const listDataUpdate = createAsyncThunk('appSizes/listDataUpdate', async (data: any) => {
    return data
  })

  export const changeTheme = createAsyncThunk('appSizes/changeTheme', async (data: any) => {
    return data
  })

export const appEmployeeSlice = createSlice({
  name: 'appSizes',
  initialState: {
    list: [...staticList],
    personalDetails: {},
    bankDetails: {},
    experienceDetails:[],
    theme:"light"
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(personalDetailsUpdate.fulfilled, (state, action) => {
        state.personalDetails = action.payload || {}
      })
      .addCase(bankDetailsUpdate.fulfilled, (state, action) => {
        state.bankDetails = action.payload || {}
      })
      .addCase(experienceDetailUpdate.fulfilled, (state, action) => {
        state.experienceDetails = action.payload || {}
      })
      .addCase(listDataUpdate.fulfilled, (state, action) => {
        state.list = action.payload || []
      })
      .addCase(changeTheme.fulfilled, (state, action) => {
        state.theme = action.payload || "light"
      })
  }
})

export default appEmployeeSlice.reducer
