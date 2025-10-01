import { useState, useEffect } from "react";

// Types
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

// Recipe Card Component
function RecipeCard({ recipe }: { recipe: Recipe }) {
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

// Static recipe data
const ALL_RECIPES: Recipe[] = [
  {
    id: 1,
    name: "Paneer Butter Masala",
    calories: 450,
    protein: 20,
    tags: ["spicy", "vegetarian", "high calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 2,
    name: "Veg Biryani",
    calories: 600,
    protein: 15,
    tags: ["spicy", "rice", "high calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 3,
    name: "Greek Salad",
    calories: 250,
    protein: 8,
    tags: ["healthy", "vegetarian", "low calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 4,
    name: "Grilled Chicken",
    calories: 350,
    protein: 45,
    tags: ["high protein", "low calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 5,
    name: "Chocolate Cake",
    calories: 550,
    protein: 6,
    tags: ["sweet", "dessert", "high calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 6,
    name: "Protein Smoothie",
    calories: 300,
    protein: 30,
    tags: ["high protein", "healthy", "drink"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 7,
    name: "Dal Makhani",
    calories: 400,
    protein: 18,
    tags: ["spicy", "vegetarian", "high calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 8,
    name: "Chicken Tikka",
    calories: 320,
    protein: 40,
    tags: ["spicy", "high protein"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 9,
    name: "Fruit Salad",
    calories: 150,
    protein: 3,
    tags: ["healthy", "vegetarian", "low calorie"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 10,
    name: "Pasta Alfredo",
    calories: 650,
    protein: 22,
    tags: ["high calorie", "vegetarian"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 11,
    name: "Quinoa Bowl",
    calories: 380,
    protein: 14,
    tags: ["healthy", "vegetarian"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
  {
    id: 12,
    name: "Fish Curry",
    calories: 420,
    protein: 35,
    tags: ["spicy", "high protein"],
    ingredients: [],
    utensils: [],
    procedure: [],
  },
];

export default function Home() {
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(ALL_RECIPES);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardSize, setCardSize] = useState<"small" | "medium" | "large">("medium");
  const [calorieFilter, setCalorieFilter] = useState<[number, number]>([0, 1000]);
  const [proteinFilter, setProteinFilter] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const filtered = ALL_RECIPES.filter((recipe) => {
      const matchesSearch =
        searchQuery === "" ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCalories =
        recipe.calories >= calorieFilter[0] &&
        recipe.calories <= calorieFilter[1];

      const matchesProtein =
        recipe.protein >= proteinFilter[0] &&
        recipe.protein <= proteinFilter[1];

      return matchesSearch && matchesCalories && matchesProtein;
    });

    setFilteredRecipes(filtered);
  }, [searchQuery, calorieFilter, proteinFilter]);

  const resetFilters = () => {
    setCalorieFilter([0, 1000]);
    setProteinFilter([0, 100]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Digital Cookbook</h1>
        <p className="text-gray-400">Discover and cook amazing recipes</p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors whitespace-nowrap font-medium"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-gray-400 text-sm">Card Size:</span>
          {(["small", "medium", "large"] as const).map((size) => (
            <button
              key={size}
              onClick={() => setCardSize(size)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                cardSize === size
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-750 hover:text-gray-300"
              }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>

        {showFilters && (
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 space-y-4">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Calories: {calorieFilter[0]} - {calorieFilter[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={calorieFilter[0]}
                    onChange={(e) =>
                      setCalorieFilter([+e.target.value, calorieFilter[1]])
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={calorieFilter[1]}
                    onChange={(e) =>
                      setCalorieFilter([calorieFilter[0], +e.target.value])
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Protein (g): {proteinFilter[0]} - {proteinFilter[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={proteinFilter[0]}
                    onChange={(e) =>
                      setProteinFilter([+e.target.value, proteinFilter[1]])
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={proteinFilter[1]}
                    onChange={(e) =>
                      setProteinFilter([proteinFilter[0], +e.target.value])
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full sm:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        <p className="text-gray-400 text-sm">
          Showing {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Grid with explicit classes based on card size */}
      <div className={
        cardSize === "small"
          ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
          : cardSize === "large"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      }>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No recipes found matching your criteria
        </div>
      )}
    </div>
  );
}