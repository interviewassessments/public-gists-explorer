import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../api/apiConstants';
import { fetchPublicGistsAPI } from '../../api/fetchPublicGistsAPI';
import { GENERAL_ERROR_MESSAGE, initialPublicGistData, PAGE_SIZE } from '../../utils/constants';
import { GistsData, PublicGistsState } from '../../utils/types';

const initialState: PublicGistsState = {
  loading: false,
  gists: initialPublicGistData,
  error: {
    message: '',
  },
  isEndReached: false,
};

const requestParams = {
  method: 'GET',
  headers: {
    accept: 'application/vnd.github+json',
  },
};

export const fetchPublicGists = createAsyncThunk(
  'gists/fetchPublicGists',
  async (userInfoObj: any) => {
    try {
      const url = `${BASE_URL}/users/${userInfoObj.userName}/gists?page=${userInfoObj.pageNumber}&per_page=${PAGE_SIZE}`;
      const response = await fetchPublicGistsAPI(url, requestParams);
      return response as GistsData[];
    } catch (e) {
      console.error(e);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearGists(state) {
      state.gists = [];
      state.isEndReached = false;
      state.error.message = '';
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicGists.pending, (state) => {
        state.loading = true;
        state.error.message = '';
      })
      .addCase(fetchPublicGists.fulfilled, (state, action) => {
        if (action.payload?.length === undefined) {
          state.gists = [];
          state.isEndReached = false;
        } else {
          if (action.payload?.length && action.payload?.length !== 0) {
            state.gists = [...state.gists, ...action.payload];
            state.isEndReached = false;
          } else {
            state.gists = [...state.gists];
            state.isEndReached = true;
          }
        }
        state.loading = false;
        state.error.message = '';
      })
      .addCase(fetchPublicGists.rejected, (state) => {
        console.log();
        state.loading = false;
        state.error.message = GENERAL_ERROR_MESSAGE;
        state.gists = [];
      });
  },
});

export const { clearGists } = searchSlice.actions;
export default searchSlice.reducer;
