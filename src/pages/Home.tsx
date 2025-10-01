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

  // ✅ New state for tags
  const [allTags, setAllTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Fetch recipes from JSON file
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("/recipes.json");
        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await response.json();
        setAllRecipes(data);
        setFilteredRecipes(data);

        // ✅ Collect unique tags from all recipes
        const tagsSet = new Set<string>();
        data.forEach((recipe: Recipe) => {
          recipe.tags.forEach((tag) => tagsSet.add(tag));
        });
        setAllTags(Array.from(tagsSet).sort());

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipes");
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

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
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => recipe.tags.includes(tag));

      return matchesSearch && matchesCalories && matchesProtein && matchesTags;
    });

    setFilteredRecipes(filtered);
  }, [searchQuery, calorieFilter, proteinFilter, selectedTags, allRecipes]);


  const resetFilters = () => {
    setCalorieFilter([0, 1000]);
    setProteinFilter([0, 100]);
    setSearchQuery("");
    setSelectedTags([]);
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
          <p className="text-gray-400 mt-2">
            Make sure recipes.json exists in the public folder
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#2E2E2E] px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-[#FF7B54]">Digital Cookbook</h1>
        <p className="text-gray-700">Discover and cook amazing recipes</p>
      </div>

      {/* Search + Toggle Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by name or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-orange-300 bg-white text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-2 bg-[#FF8C42] hover:bg-[#FF7B54] text-white rounded-lg transition-colors font-medium"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Card size selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-gray-500 text-sm">Card Size:</span>
          {(["small", "medium", "large"] as const).map((size) => (
            <button
              key={size}
              onClick={() => setCardSize(size)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${cardSize === size
                  ? "bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md"
                  : "bg-orange-100 text-orange-600 hover:bg-orange-200"
                }`}
            >
              {size.charAt(0).toUpperCase() + size.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-6 rounded-xl border border-orange-200 shadow-md space-y-6">
            {/* Calories + Protein */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-orange-700 mb-2">
                  Calories: {calorieFilter[0]} - {calorieFilter[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={calorieFilter[0]}
                    onChange={(e) =>
                      setCalorieFilter([+e.target.value, calorieFilter[1]])
                    }
                    className="w-full px-3 py-2 bg-orange-50 rounded-lg border border-orange-300 
                    text-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={calorieFilter[1]}
                    onChange={(e) =>
                      setCalorieFilter([calorieFilter[0], +e.target.value])
                    }
                    className="w-full px-3 py-2 bg-orange-50 rounded-lg border border-orange-300 
                    text-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Max"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-orange-700 mb-2">
                  Protein (g): {proteinFilter[0]} - {proteinFilter[1]}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={proteinFilter[0]}
                    onChange={(e) =>
                      setProteinFilter([+e.target.value, proteinFilter[1]])
                    }
                    className="w-full px-3 py-2 bg-orange-50 rounded-lg border border-orange-300 
                    text-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={proteinFilter[1]}
                    onChange={(e) =>
                      setProteinFilter([proteinFilter[0], +e.target.value])
                    }
                    className="w-full px-3 py-2 bg-orange-50 rounded-lg border border-orange-300 
                    text-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* ✅ Tag Filter */}
            <div>
              <label className="block text-sm font-medium text-orange-700 mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-3">
                {allTags.map((tag) => (
                  <label
                    key={tag}
                    className="flex items-center gap-2 px-3 py-1 border rounded-lg text-sm cursor-pointer
                    border-orange-300 hover:bg-orange-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedTags.includes(tag)}
                      onChange={() => {
                        setSelectedTags((prev) =>
                          prev.includes(tag)
                            ? prev.filter((t) => t !== tag)
                            : [...prev, tag]
                        );
                      }}
                    />
                    <span className="text-gray-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={resetFilters}
              className="w-full sm:w-auto px-6 py-2 bg-orange-500 hover:bg-orange-600 
              text-white rounded-lg transition-colors font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}

        <p className="text-gray-400 text-sm">
          Showing {filteredRecipes.length} recipe
          {filteredRecipes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Recipe Grid */}
      <div
        className={
          cardSize === "small"
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
            : cardSize === "large"
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        }
      >
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
