import { createSlice } from '@reduxjs/toolkit';
import { ToastContainer, toast } from "react-toastify";

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

export const fetchMealCategories = () => {
    return async (dispatch) =>{
try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        if (!res.ok) {
          throw new Error("Requested Category not found");
        }
        const categoryList = await res.json();

        dispatch(categoryActions.setCategories(categoryList.meals));
        toast.info("fetching data from api");
      } catch (e) {
        toast.error(e.message);
      }
    }
}

export default categorySlice.reducer;