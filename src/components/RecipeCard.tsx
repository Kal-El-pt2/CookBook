import { Link } from "react-router-dom";
import type { Recipe } from "../types";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const imagePath = `/images/${recipe.id}.jpg`;

  // Tag color mapping
  const tagColors: Record<string, string> = {
    spicy: "bg-red-100 text-red-600",
    vegetarian: "bg-green-100 text-green-600",
    rice: "bg-yellow-100 text-yellow-700",
    "high calorie": "bg-orange-100 text-orange-700",
    default: "bg-orange-100 text-orange-600",
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="bg-gradient-to-b from-white to-orange-50 rounded-2xl overflow-hidden border border-orange-200 
                      hover:border-orange-400 shadow-md hover:shadow-xl hover:scale-[1.02] 
                      transition-transform duration-300 ease-in-out">

        {/* Food Image */}
        <div className="overflow-hidden">
          <img
            src={imagePath}
            alt={recipe.name}
            className="w-full h-44 object-cover rounded-t-2xl hover:scale-110 transition-transform duration-500"
            onError={(e) => (e.currentTarget.src = "/images/placeholder.jpg")}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-orange-600">{recipe.name}</h3>

          {/* Nutritional info */}
          <div className="flex gap-4 text-sm text-gray-700 mb-3">
            <span>🔥 {recipe.calories} cal</span>
            <span>💪 {recipe.protein}g protein</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-1 rounded-full text-xs font-medium shadow-sm ${tagColors[tag] || tagColors.default}`}
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
