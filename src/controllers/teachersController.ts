import { Request, Response } from "express";
import teacherService from "../services/teacherService";

 async function getTeachers(req:Request, res:Response) {
    const {discipline}=req.params;

    const teachers = await teacherService.getDiscipline(Number(discipline));

    res.send(teachers);
}

export const teacherController ={
    getTeachers,
}