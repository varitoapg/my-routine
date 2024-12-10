import { knexPostgresClient } from "@api/client/knexPostgresClient";
import { NextApiRequest, NextApiResponse } from "next";
import { Ingredients } from "@api/types/typesFromDB";
import { sendError } from "@api/utils/responses";
import {
  AppError,
  BadRequest,
  Conflict,
  InternalError,
  MethodNotAllowed,
} from "@lib/errors/AppError";
import { checkAndDecodeToken } from "@api/utils/checkAndDecodeToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;

    if (method === "POST") {
      await post(req, res);
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

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id_measure, name, description } = req.body as Ingredients;
    const userData = await checkAndDecodeToken(req);

    if (!name) {
      throw new BadRequest("Name is required");
    }

    const measure = await knexPostgresClient("measures")
      .where({ measure_id: id_measure })
      .first();

    if (!measure) {
      throw new BadRequest("Measure not found");
    }

    const ingredient: Ingredients = await knexPostgresClient("ingredients")
      .select("*")
      .where({ name })
      .andWhere(function () {
        this.where("id_user", userData.userId).orWhere(function () {
          this.whereNotNull("id_group").andWhere("id_group", userData.groupId);
        });
      })
      .first();

    if (ingredient) {
      throw new Conflict("Ingredient already exists", "ingredient");
    }

    const newIngredient = await knexPostgresClient("ingredients")
      .insert({
        name,
        id_measure,
        id_user: userData.userId,
        id_group: userData.groupId,
        description,
      })
      .returning(["ingredient_id", "name"]);

    res.status(201).json({
      success: true,
      message: "Ingredient added successfully",
      data: newIngredient[0],
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      sendError(res, error);
      return;
    }
    sendError(res, new InternalError());
  }
}
