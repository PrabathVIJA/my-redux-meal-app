import { useSelector, useDispatch } from "react-redux";
import { selectedMealActions } from "../store/selectedMealSlice";
export default function SelectedMeals() {
  const dispatch = useDispatch();
  const selectedMeals = useSelector((state) => state.selectedMeal.meals);

  return (
    <>
      {selectedMeals.map((selectedMeal) => (
        <div>
          <img
            src={selectedMeal.strMealThumb}
            alt={selectedMeal.strMeal}
            width="200"
            height="200"
          />
          <button
            onClick={() =>
              dispatch(selectedMealActions.removeMeal(selectedMeal.idMeal))
            }
          >
            Remove
          </button>
          <p>{selectedMeal.strMeal}</p>
        </div>
      ))}
    </>
  );
}
