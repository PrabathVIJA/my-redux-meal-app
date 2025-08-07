import { createSlice } from '@reduxjs/toolkit';

const mealSlice = createSlice({name:'meals',initialState:{meals:[]},reducers:{
    setMeals:(state,action)=>{
state.meals = action.payload;
    },
    clearMeals:(state)=>{
        state.meals = []
    }
}})

export const mealActions = mealSlice.actions;
export default mealSlice.reducer;