import { Request, Response } from "express";
import {
  IError,
  errorTypeToStatusCode,
  isError,
} from "../utils/errorUtils";

export function errorHandler(
  err: Error | IError,
  req: Request,
  res: Response
) {
  console.log(err);

  if (isError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
