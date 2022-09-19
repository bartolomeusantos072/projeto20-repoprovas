import { Users,Test } from "@prisma/client";


export type TCreateUserData = Omit<Users, "id">;
export type TCreateTestData = Omit<Test, "id" | "teacherDisciplineId" | "view" > & {
    teacherId: number;
    disciplineId: number;
  };
