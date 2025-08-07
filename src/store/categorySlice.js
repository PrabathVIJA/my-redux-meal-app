import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({name:'category',initialState:{
    categories:[],
    selectedCategory:'SeaFood'
},
reducers:{
    setCategories:(state,action)=>{
        state.categories = action.payload;
    },
    setSelectedCategory:(state,action)=>{
       state.selectedCategory =  action.payload;
    }
}
})

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;