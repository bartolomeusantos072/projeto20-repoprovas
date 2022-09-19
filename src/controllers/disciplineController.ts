import { Request, Response } from "express";
import disciplineService from "../services/disciplineService";

async function getDiscipline(req:Request, res:Response) {
   const {term} = req.params;
   const  disciplines = await disciplineService.getTerm(Number(term));
   res.send(disciplines);
}
export default {
    getDiscipline,
}