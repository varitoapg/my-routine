import { NextApiRequest, NextApiResponse } from "next";
import { knexPostgresClient } from "@/api/client/knexPostgresClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { method } = req;

    switch (method) {
      case "GET":
        await get(req, res);
        break;
      default:
        res.status(500).json({ error: "Method not allowed" });
    }
  } catch (e) {
    res.status(500).json({ error: (e as Error).message });
  }
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  const { hemisphere } = req.query;

  try {
    const getCurrentMonth = () => new Date().getMonth() + 1;

    const products = await knexPostgresClient("seasonal_produce as sp")
      .select("seasonal_produce_id", "name", "type", "month")
      .where("hemisphere", hemisphere);

    const currentMonth = getCurrentMonth();

    const filteredProduce = products.filter((product) => {
      const monthsArray = product.month.split(",").map(Number);

      return monthsArray.includes(currentMonth);
    });

    res.status(200).json(filteredProduce);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
