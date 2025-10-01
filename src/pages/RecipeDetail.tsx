import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Recipe {
  id: number;
  name: string;
  calories: number;
  protein: number;
  tags: string[];
  ingredients: string[];
  utensils: string[];
  procedure: string[];
}

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes.json");
        if (!response.ok) throw new Error("Failed to fetch recipes");
        const data: Recipe[] = await response.json();
        const found = data.find((r) => r.id === Number(id));
        if (!found) setError("Recipe not found");
        else setRecipe(found);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipe");
      }
    };
    fetchRecipes();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>{error}</p>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading recipe...</p>
      </div>
    );
  }

  const imagePath = `/images/${recipe.id}.jpg`;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{recipe.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Back
        </button>
      </div>

      {/* Top section: ingredients + image */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Ingredients + Utensils */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3">Utensils</h2>
            <ul className="list-disc list-inside text-gray-300 space-y-1">
              {recipe.utensils.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex justify-end">
          <img
            src={imagePath}
            alt={recipe.name}
            className="max-w-sm w-full rounded-lg object-cover border border-gray-700"
          />
        </div>

      </div>

      {/* Nutrition Info */}
      <div className="mt-10 bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">Nutritional Info</h2>
        <div className="flex gap-6 text-gray-300">
          <span>🔥 {recipe.calories} Calories</span>
          <span>💪 {recipe.protein}g Protein</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-300">
          {recipe.procedure.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
