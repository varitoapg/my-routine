export const recipeTypes = [
  "breakfast",
  "morning_snack",
  "lunch",
  "afternoon_snack",
  "dinner",
] as const;

export type RecipeType = (typeof recipeTypes)[number];

export type RecipeWithIngredients = {
  recipe_id: string;
  name: string;
  description: string | null;
  type: RecipeType;
  ingredients: {
    ingredient_id: string;
    name: string;
    amount: string | null;
  };
};
