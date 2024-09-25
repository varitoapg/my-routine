import { knexPostgresClient } from "@api/client/knexPostgresClient";
import { generateToken } from "@api/utils/generateToken";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "@api/utils/comparePassword";
import { LoginUser } from "@api/types/user";
import { Users } from "@api/types/typesFromDB";
import { AppError } from "@lib/errors/AppError";
import { AuthErrorCodes } from "@lib/errors/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;

    if (method === "POST") {
      await post(req, res);
    } else {
      res.status(500).json({ error: "Method not allowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Method not allowed" });
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
      const error = new AppError(
        AuthErrorCodes.WrongCredentials,
        "Invalid username or password.",
        401,
      );

      return res
        .status(error.status)
        .json({ error: error.code, message: error.message });
    }

    await comparePassword(password, user.password);

    const token = await generateToken({
      groupId: user.id_group,
      userId: user.user_id,
    });

    res.status(200).json({ token });
  } catch (error: unknown) {
    const newError = new AppError(
      AuthErrorCodes.GeneralError,
      "General error.",
      500,
    );

    return res
      .status(newError.status)
      .json({ error: newError.code, message: newError.message });
  }
}
