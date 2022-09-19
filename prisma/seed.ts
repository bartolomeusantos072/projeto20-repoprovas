
import bcrypt from 'bcrypt';
import {prisma} from '../src/config/database';

async function main() {
   
    const login =[{
            email: "pescando@email.com",
            password: bcrypt.hashSync("senhatest123",10),
        },];

    const terms = [ {  number: 1, }, {  number: 2, }, {  number: 3, }, {  number: 4, }, {  number: 5, }, {  number: 6, } ];

    const category = [
        {
          name: 'Projeto'
        },
        {
          name: 'Prática'
        },
        {
          name: 'Recuperação'
        },
      ];
    
      const teachers = [
        {
          name: 'Diego Pinho',
        },
        {
          name: 'Bruna Hamori',
        },
      ];
    
      const disciplines = [
        {
          name: 'HTML e CSS',
          termId: 1,
        },
        {
          name: 'JavaScript',
          termId: 2,
        },
        {
          name: 'React',
          termId: 3,
        },
        {
          name: 'Humildade',
          termId: 4,
        },
        {
          name: 'Planejamento',
          termId: 5,
        },
        {
          name: 'Autoconfiança',
          termId: 6,
        },
      ];
    
      const teachersDisciplines = [
        {
          teacherId: 1,
          disciplineId: 1,
        },
        {
          teacherId: 1,
          disciplineId: 2,
        },
        {
          teacherId: 1,
          disciplineId: 3,
        },
        {
          teacherId: 2,
          disciplineId: 4,
        },
        {
          teacherId: 2,
          disciplineId: 5,
        },
        {
          teacherId: 2,
          disciplineId: 6,
        },
      ];

      await prisma.users.createMany({ data: login });
      await prisma.term.createMany({ data: terms });
      await prisma.category.createMany({ data: category });
      await prisma.teachers.createMany({ data: teachers });
      await prisma.discipline.createMany({ data: disciplines });
      await prisma.teachersDiscipline.createMany({ data: teachersDisciplines });
}
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
