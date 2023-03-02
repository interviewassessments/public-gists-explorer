import { configureStore } from '@reduxjs/toolkit';
import searchSlice from './features/search/searchSlice';
import testSlice from './features/test/testSlice';

export const store = configureStore({
    reducer: {
        test: testSlice,
        search: searchSlice,
    }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {test: TestState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch