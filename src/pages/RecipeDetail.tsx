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
    <div className="min-h-screen bg-[#FFF8F0] text-[#2E2E2E] px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-[#FF7B54]">{recipe.name}</h1>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#FF8C42] hover:bg-[#FF7B54] text-white rounded-lg transition-colors"
        >
          Back
        </button>
      </div>

      {/* Top section: ingredients + image */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Ingredients + Utensils */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-[#FF5722]">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-[#FF5722]">Utensils</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
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
            className="max-w-sm w-full rounded-lg object-cover border border-orange-200 shadow-md"
            onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
          />
        </div>
      </div>

      {/* Nutrition Info */}
      <div className="mt-10 bg-white p-6 rounded-xl border border-orange-200 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF5722]">Nutritional Info</h2>
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            🔥 {recipe.calories} Calories
          </span>
          <span className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
            💪 {recipe.protein}g Protein
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-[#FF5722]">Instructions</h2>
        <ol className="space-y-4">
          {recipe.procedure.map((step, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center 
                         bg-orange-500 text-white font-bold rounded-full">
                {idx + 1}
              </span>
              <p className="text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </div>

    </div>
  );
}
