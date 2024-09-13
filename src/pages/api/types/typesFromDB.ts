// The TypeScript definitions below are automatically generated.
// Do not touch them, or risk, your modifications being lost.

export enum Table {
  Groups = "groups",
  GroupsUsers = "groups_users",
  Ingredients = "ingredients",
  Measures = "measures",
  MenuDay = "menu_day",
  Menus = "menus",
  Pantry = "pantry",
  RecipeIngredient = "recipe_ingredient",
  Recipes = "recipes",
  Users = "users",
  UsersRecipes = "users_recipes",
}

export type Tables = {
  "groups": Groups,
  "groups_users": GroupsUsers,
  "ingredients": Ingredients,
  "measures": Measures,
  "menu_day": MenuDay,
  "menus": Menus,
  "pantry": Pantry,
  "recipe_ingredient": RecipeIngredient,
  "recipes": Recipes,
  "users": Users,
  "users_recipes": UsersRecipes,
};

export type Groups = {
  group_id: string;
  name: string;
};

export type GroupsUsers = {
  id: string;
  id_group: string;
  id_user: string;
};

export type Ingredients = {
  ingredient_id: string;
  id_measure: string;
  weekday: string;
};

export type Measures = {
  measure_id: string;
  name: string;
};

export type MenuDay = {
  menu_day_id: string;
  id_menu: string;
  id_recipe: string;
  weekday: string;
  type: string;
};

export type Menus = {
  menu_id: string;
  id_user: string;
  initial_date: Date;
  end_date: Date;
};

export type Pantry = {
  pantry_id: string;
  id_group: string;
  id_ingredient: string;
  amount: string | null;
};

export type RecipeIngredient = {
  id: string;
  id_ingredient: string;
  id_recipe: string;
  amount: string | null;
};

export type Recipes = {
  recipe_id: string;
  name: string;
  description: string | null;
  type: string;
};

export type Users = {
  user_id: string;
  name: string;
  password: string;
  id_group: string | null;
};

export type UsersRecipes = {
  id: string;
  id_user: string;
  id_recipes: string;
};

