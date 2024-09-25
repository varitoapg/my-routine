import { knexPostgresClient } from "@api/client/knexPostgresClient";
import { generateToken } from "@api/utils/generateToken";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "@api/utils/comparePassword";
import { LoginUser } from "@api/types/user";
import { Users } from "@api/types/typesFromDB";
import {
  AppError,
  InternalError,
  MethodNotAllowed,
  Unauthorized,
} from "@lib/errors/AppError";
import { sendError } from "@api/utils/responses";

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
      sendError(res, new MethodNotAllowed("Method not allowed"));
    }
  } catch (error) {
    sendError(res, new InternalError());
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { password, username } = req.body as LoginUser;

    const user: Users = await knexPostgresClient("users")
      .select("user_id", "id_group", "password")
      .where({ name: username })
      .first();

    if (!user) {
      sendError(res, new Unauthorized("Invalid username or password"));
    }

    await comparePassword(password, user.password);

    const token = await generateToken({
      groupId: user.id_group,
      userId: user.user_id,
    });

    res.status(200).json({ token });
  } catch (error: unknown) {
    if (error instanceof AppError) {
      sendError(res, error);
      return;
    }
    sendError(res, new InternalError());
  }
}
