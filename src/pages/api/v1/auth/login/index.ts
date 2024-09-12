import { knexPostgresClient } from "@/api/client/knexPostgresClient";
import { generateToken } from "@/api/utils/generateToken";
import { NextApiRequest, NextApiResponse } from "next";
import { comparePassword } from "@/api/utils/comparePassword";
import { LoginUser } from "@/api/types/user";
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
      .select("user_id", "id_group", "password")
      .where({ name: username })
      .first();

    if (!user) {
      return res.status(401).json({ error: "Wrong credentials" });
    }

    await comparePassword(password, user.password);

    const token = generateToken({
      groupId: user.id_group,
      userId: req.body.user_id,
    });

    res.status(200).json(token);
  } catch (error) {
    if ((error as Error).message === "Wrong credentials") {
      return res.status(401).json({ error: "Wrong credentials" });
    }
    res.status(500).json({ error: (error as Error).message });
  }
}
