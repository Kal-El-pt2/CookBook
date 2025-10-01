import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Recipe } from "../types";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch("/recipes.json")
      .then((res) => res.json())
      .then((data: Recipe[]) => {
        const found = data.find((r) => r.id === Number(id));
        setRecipe(found || null);
      });
  }, [id]);

  if (!recipe) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
      <p>{recipe.calories} cal | {recipe.protein} g protein</p>

      <h3 className="text-xl mt-4">Ingredients:</h3>
      <ul className="list-disc pl-6">
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>

      <h3 className="text-xl mt-4">Utensils:</h3>
      <ul className="list-disc pl-6">
        {recipe.utensils.map((u, i) => <li key={i}>{u}</li>)}
      </ul>

      <h3 className="text-xl mt-4">Procedure:</h3>
      <ol className="list-decimal pl-6">
        {recipe.procedure.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </div>
  );
}
