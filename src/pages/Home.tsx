import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
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

export default function Home() {
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cardSize, setCardSize] = useState<"small" | "medium" | "large">("medium");
  const [calorieFilter, setCalorieFilter] = useState<[number, number]>([0, 1000]);
  const [proteinFilter, setProteinFilter] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch recipes from JSON file
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/recipes.json');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setAllRecipes(data);
        setFilteredRecipes(data);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load recipes');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search and filters
  useEffect(() => {
    const filtered = allRecipes.filter((recipe) => {
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
  }, [searchQuery, calorieFilter, proteinFilter, allRecipes]);

  const resetFilters = () => {
    setCalorieFilter([0, 1000]);
    setProteinFilter([0, 100]);
    setSearchQuery("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-xl">Loading recipes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-xl text-red-400">{error}</p>
          <p className="text-gray-400 mt-2">Make sure recipes.json exists in the public folder</p>
        </div>
      </div>
    );
  }

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