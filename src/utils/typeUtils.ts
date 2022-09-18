import { Users } from "@prisma/client";


export type TCreateUserData = Omit<Users, "id">;

