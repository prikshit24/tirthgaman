import { configureStore } from '@reduxjs/toolkit';
import templeDetailSlice from './TempleDetailSlice/TempleDetailSlice';

export default configureStore({
    reducer: {
        templeDetail: templeDetailSlice
    },
  });