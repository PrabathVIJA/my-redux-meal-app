import { createSlice } from '@reduxjs/toolkit';
const selectedMealSlice = createSlice({name:'selectedMeal',initialState:{meals:[]},reducers:{
    addMeal:(state,action)=>{
        const exist = state.meals.find((meal)=> meal.idMeal === action.payload.idMeal);
        if(!exist){
            state.meals.push(action.payload)
        } 
    },
    removeMeal:(state,action)=>{
    state.meals = state.meals.filter((meal)=> meal.idMeal !== action.payload );
 
    }
}})

export const selectedMealActions = selectedMealSlice.actions;

export default selectedMealSlice.reducer;