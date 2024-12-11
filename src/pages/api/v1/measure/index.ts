import { knexPostgresClient } from "@api/client/knexPostgresClient";
import { NextApiRequest, NextApiResponse } from "next";
import { Measures } from "@api/types/typesFromDB";
import { sendError } from "@api/utils/responses";
import {
  AppError,
  InternalError,
  MethodNotAllowed,
} from "@lib/errors/AppError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;

    if (method === "GET") {
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
    const measures: Measures[] = await knexPostgresClient("measures").select(
      "measure_id",
      "name",
    );

    res.status(201).json({
      success: true,
      data: measures,
    });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      sendError(res, error);
      return;
    }
    sendError(res, new InternalError());
  }
}
