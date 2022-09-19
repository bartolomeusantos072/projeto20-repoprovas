import { Request, Response } from "express";
import categoryService from "../services/categoryService";

async function findMany(req: Request, res: Response) {
  const categories = await categoryService.findManyCategories();
  res.send({ categories });
}

export const categoryController = {
  findMany
}

