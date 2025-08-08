import { useSelector } from "react-redux";
export default function SelectedMeals() {
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
          <p>{selectedMeal.strMeal}</p>
        </div>
      ))}
    </>
  );
}
