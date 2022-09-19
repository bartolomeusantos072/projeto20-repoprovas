import teachersDisciplinesRepository from "../repositories/teacherDisciplineRepository";

export async function getTeacherAndDiscipline(teacherId: number, disciplineId: number) {
  return teachersDisciplinesRepository.getTeacherAndDiscipline(teacherId, disciplineId);
}

const teacherDisciplineService =  {
  getTeacherAndDiscipline
};

export default teacherDisciplineService;
