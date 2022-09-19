import { Users,Test,TeachersDiscipline, Discipline, Teachers } from "@prisma/client";


export type TCreateUserData = Omit<Users, "id">;
export type TCreateTestData = Omit<Test, "id" | "teacherDisciplineId" | "view" > & {
    teacherId: number;
    disciplineId: number;
  };
export type TTeachersDiscipline ={teacher:Teachers,teacherId:number, discipline:Discipline,disciplineId:number, categoryId:number,tests:Test[]}