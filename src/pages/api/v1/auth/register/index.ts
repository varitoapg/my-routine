import { knexPostgresClient } from "@/api/client/knexPostgresClient";
import { generateToken } from "@/api/utils/generateToken";
import { NextApiRequest, NextApiResponse } from "next";
import { LoginUser } from "@/api/types/user";
import bcrypt from "bcryptjs";
import { Users } from "@/api/types/typesFromDB";

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
      .select("*")
      .where({ name: username })
      .first();

    if (user) {
      return res.status(401).json({ error: "User already exists" });
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
      return res.status(500).json({ error: "Failed to retrieve user ID" });
    }

    const token = await generateToken({
      groupId: null,
      userId: newUserId,
    });

    res.status(200).json({ token });
  } catch (error) {
    if ((error as Error).message === "Wrong credentials") {
      return res.status(401).json({ error: "Wrong credentials" });
    }
    res.status(500).json({ error: (error as Error).message });
  }
}
