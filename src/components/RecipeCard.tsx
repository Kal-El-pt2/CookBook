// components/RecipeCard.jsx (or .tsx)
import type { Recipe } from "../types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition-all hover:shadow-lg">
      <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-4xl">🍽️</span>
      </div>
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
  );
}