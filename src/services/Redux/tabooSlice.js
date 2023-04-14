import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetch } from "../utils/api"

export const fetchAllCategories = createAsyncThunk('fetch-all-categories', async (apiUrl, thunkAPI) => {
  try {
    const data = await fetch(apiUrl)
    return data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error in fetching categories");
  }
})

export const fetchcurrentCategoryData = createAsyncThunk('fetch-current-category-data', async (apiUrl, thunkAPI) => {
  try {
    const data = await fetch(apiUrl)
    return data?.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Error in fetching current category data");
  }
})

export const initialState = {
  categories: {},
  categoriesFetchStatus: { loading: false, error: "" },
  currentCategoryData: [],
  currentCategoryFecthStatus: { loading: false, error: "" },
  currentTabooItem: {},
  locale: "en",
  correctCount: 0,
  isPlaying: false
}

const tabooSlice = createSlice({
  name: 'taboo',
  initialState,
  reducers: {
    unsetCategories: (state) => {
      state.categories = []
    },
    setCurrentTabooItem: (state, action) => {
      state.currentTabooItem = action.payload
    }, 
    increaseCorrectCount: (state) => {
      state.correctCount += 1
    },
    resetCorrectCount: (state) => {
      state.correctCount = 0
    },
    setIsPlaying: (state) => {
      state.isPlaying = true
    },
    unsetIsPlaying: (state) => {
      state.isPlaying = false
    },
    unsetTabooTurn: (state) => {
      state.isPlaying = false
      state.correctCount = 0
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
            state.categoriesFetchStatus.loading = true
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.categoriesFetchStatus.loading = false
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.categoriesFetchStatus.loading = true
        state.categoriesFetchStatus.error = action.payload
      })
      .addCase(fetchcurrentCategoryData.pending, (state) => {
        state.currentCategoryFecthStatus.loading = true
      })
     .addCase(fetchcurrentCategoryData.fulfilled, (state, action) => {
        state.currentCategoryData = action.payload
        state.currentCategoryFecthStatus.loading = false
      })
      .addCase(fetchcurrentCategoryData.rejected, (state, action) => {
        state.currentCategoryFecthStatus.loading = true
        state.currentCategoryFecthStatus.error = action.payload
      });
  },
})

export const { unsetCategories, setCurrentTabooItem, increaseCorrectCount, resetCorrectCount, setIsPlaying, unsetIsPlaying, unsetTabooTurn } = tabooSlice.actions;
export default tabooSlice