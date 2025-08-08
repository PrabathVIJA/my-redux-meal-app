import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { categoryActions } from "./store/categorySlice.js";
import { ClipLoader } from "react-spinners";
import { uiSliceActions } from "./store/uiSlice.js";
import { mealActions } from "./store/mealSlice.js";
import { selectedMealActions } from "./store/selectedMealSlice.js";
import "./App.css";
import SelectedMeals from "./components/SelectedMeals.jsx";

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const meals = useSelector((state) => state.meals.meals);
  const categories = useSelector((state) => state.category.categories);

  // Fetch all meal categories on first mount
  useEffect(() => {
    async function fetchMealCategories() {
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
    fetchMealCategories();
  }, [dispatch]);

  useEffect(() => {
    async function fetchItem() {
      dispatch(uiSliceActions.setLoading(true));
      try {
        const data = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
        if (!data.ok) {
          throw new Error("Requested items not found");
        }
        const item = await data.json();
        toast.info(`fetching requested items from from ${selectedCategory}`);
        console.log(item.meals);

        if (!item.meals) {
          throw new Error("Unexpected response format");
        }

        dispatch(mealActions.setMeals(item.meals || []));
      } catch (e) {
        toast.error(e.message);
      } finally {
        dispatch(uiSliceActions.setLoading(false));
      }
    }
    fetchItem();
  }, [selectedCategory, dispatch]);
  return (
    <>
      <SelectedMeals />
      <label>Dropdown</label>
      <select
        value={selectedCategory}
        onChange={(e) =>
          dispatch(categoryActions.setSelectedCategory(e.target.value))
        }
      >
        {categories.map((category) => (
          <option key={category.strCategory} value={category.strCategory}>
            {category.strCategory}
          </option>
        ))}
      </select>
      <button onClick={() => dispatch(mealActions.clearMeals())}>
        Clear Meals
      </button>
      {loading ? (
        <ClipLoader color="#000" size={50} />
      ) : (
        meals.map((meal) => (
          <div key={meal.strMeal}>
            <button onClick={() => dispatch(selectedMealActions.addMeal(meal))}>
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                width="200"
                height="200"
              />
            </button>
            <p>{meal.strMeal}</p>
          </div>
        ))
      )}
    </>
  );
}

export default App;
