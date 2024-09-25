import { AppError } from "@lib/errors/AppError";
import { NextApiResponse } from "next";

export function sendError(res: NextApiResponse, err: AppError) {
  res.status(err.status).json({
    success: false,
    message: err.message,
    code: err.code,
  });
}
