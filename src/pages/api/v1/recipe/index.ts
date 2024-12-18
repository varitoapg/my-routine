import { NextApiRequest, NextApiResponse } from "next";
import { sendError } from "@api/utils/responses";
import {
  AppError,
  InternalError,
  MethodNotAllowed,
} from "@lib/errors/AppError";
import { checkAndDecodeToken } from "@api/utils/checkAndDecodeToken";
import { knexPostgresClient } from "@api/client/knexPostgresClient";
import { Ingredients, RecipeIngredient, Recipes } from "@api/types/typesFromDB";
import { RecipeWithIngredients } from "@api/types/recipe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;

    if (method === "POST") {
      // await post(req, res);
    } else if (method === "GET") {
      await get(req, res);
    } else {
      res.setHeader("Allow", ["POST"]);
      throw new MethodNotAllowed("Method not allowed");
    }
  } catch (error: unknown) {
    if (error instanceof AppError) {
      sendError(res, error);
      return;
    }
    sendError(res, new InternalError());
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userData = await checkAndDecodeToken(req);

    const { userId, groupId } = userData;

    const recipes: RecipeWithIngredients[] = await knexPostgresClient<Recipes>(
      "recipes as r",
    )
      .select(
        "r.recipe_id",
        "r.name",
        "r.description",
        "r.type",
        knexPostgresClient.raw(`
      json_agg(json_build_object(
        'ingredient_id', i.ingredient_id,
        'name', i.name,
        'amount', ri.amount
      )) as ingredients
    `),
      )
      .leftJoin<RecipeIngredient>(
        "recipe_ingredient as ri",
        "r.recipe_id",
        "ri.id_recipe",
      )
      .leftJoin<Ingredients>(
        "ingredients as i",
        "ri.id_ingredient",
        "i.ingredient_id",
      )
      .where((builder) => {
        builder.where("id_user", userId);
        if (groupId) {
          builder.orWhere("id_group", groupId);
        }
      })
      .groupBy("r.recipe_id");

    res.status(200).json({
      success: true,
      data: recipes,
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      sendError(res, error);
      return;
    }
    sendError(res, new InternalError());
  }
}

// async function post(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const userData = await checkAndDecodeToken(req);

//     await knexPostgresClient.transaction(async (transaction) => {});
//     res.status(201).json({
//       success: true,
//       message: "",
//       data: {},
//     });
//   } catch (error: unknown) {
//     if (error instanceof AppError) {
//       sendError(res, error);
//       return;
//     }
//     sendError(res, new InternalError());
//   }
// }
