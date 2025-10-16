// features/promotion/promotionSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PromotionState {
  selectedPromotionId: string | null;
  filterType: number;
}

const initialState: PromotionState = {
  selectedPromotionId: null,
  filterType: 1,
};

const promotionSlice = createSlice({
  name: 'promotion',
  initialState,
  reducers: {
    setSelectedPromotionId(state, action: PayloadAction<string>) {
      state.selectedPromotionId = action.payload;
    },
    setFilterType(state, action: PayloadAction<number>) {
      state.filterType = action.payload;
    },
  },
});

export const { setSelectedPromotionId, setFilterType } = promotionSlice.actions;
export default promotionSlice.reducer;
