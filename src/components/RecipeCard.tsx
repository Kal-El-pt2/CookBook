import { Link } from "react-router-dom";
import type { Recipe } from "../types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const imagePath = `/images/${recipe.id}.jpg`;

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg">
        <img
          src={imagePath}
          alt={recipe.name}
          className="w-full h-40 object-cover"
          onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-white">{recipe.name}</h3>
          <div className="flex gap-4 text-sm text-gray-400 mb-3">
            <span>🔥 {recipe.calories} cal</span>
            <span>💪 {recipe.protein}g protein</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
