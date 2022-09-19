import {teacherRepository} from "../repositories/teacherRepository";

async function getIdTeacher(id:number){
     return teacherRepository.getIdTeacher(id);
}

async function getDiscipline(discipline: number) {
    return teacherRepository.getDiscipline(discipline);
  }

export default {
    getIdTeacher,
    getDiscipline
}