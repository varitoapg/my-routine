import { knexPostgresClient } from "@api/client/knexPostgresClient";
import { generateToken } from "@api/utils/generateToken";
import { NextApiRequest, NextApiResponse } from "next";
import { LoginUser } from "@api/types/user";
import bcrypt from "bcryptjs";
import { Users } from "@api/types/typesFromDB";
import { sendError } from "@api/utils/responses";
import {
  AppError,
  Conflict,
  InternalError,
  MethodNotAllowed,
} from "@lib/errors/AppError";

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
    const { password, username } = req.body as LoginUser;

    const user: Users = await knexPostgresClient("users")
      .select("*")
      .where({ name: username })
      .first();

    if (user) {
      throw new Conflict("User already exists", "user");
    }

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS as string),
    );

    let newUserId: string | undefined;

    await knexPostgresClient.transaction(async (transaction) => {
      await transaction("users").insert({
        name: username,
        password: hashedPassword,
      });

      newUserId = (
        await transaction("users")
          .select("user_id")
          .where({ name: username })
          .first()
      )["user_id"];
    });

    if (!newUserId) {
      throw new InternalError("Failed to retrieve user ID");
    }

    const token = await generateToken({
      groupId: null,
      userId: newUserId,
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
