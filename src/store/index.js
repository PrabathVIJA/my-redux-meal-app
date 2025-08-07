import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./categorySlice";
import uiReducer from "./uiSlice.js";
import mealReducer from "./mealSlice.js"
import selectedMealreducer from "./selectedMealSlice.js";

const store = configureStore({reducer:{category:categoryReducer,ui:uiReducer,meals:mealReducer,selectedMeal:selectedMealreducer}})

export default store;