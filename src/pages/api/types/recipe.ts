export const recipeTypes = [
  "breakfast",
  "morning_snack",
  "lunch",
  "afternoon_snack",
  "dinner",
] as const;

export type RecipeType = (typeof recipeTypes)[number];
