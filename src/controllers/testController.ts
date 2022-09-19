import { Request, Response } from "express";
import testService from "../services/testService";

async function insertTest(req: Request, res: Response) {
  await testService.insertTest(req.body);
  res.sendStatus(201);
}

async function findTest(req: Request, res: Response) {
  const { groupBy, teacher, discipline } = req.query as { groupBy: string; teacher: string; discipline: string };
  
  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.findTest({ groupBy, teacher, discipline });
  res.send({ tests });
}

async function viewTest(req: Request, res: Response) {
  const { id } = req.params;

  await testService.viewTest(+id);
  res.sendStatus(200);
}

export const testController = {
  findTest,
  insertTest,
  viewTest
}

